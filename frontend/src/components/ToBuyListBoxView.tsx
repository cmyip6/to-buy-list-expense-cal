import { Card, Text, Badge, Button, Group, Grid } from '@mantine/core';
import { IconArrowBackUp, IconCheck, IconMinus, IconPlus } from '@tabler/icons';
import { useState } from 'react';
import { AlertModal } from './AlertModal';
import { NewItemModel } from './NewItemModel';
import useLongPress from '../hooks/useLongPress';
import { triggerAlertModelAction, triggerNewItemModelAction } from '../redux/toBuyList/slice';
import { deleteItem, editItem } from '../redux/toBuyList/thunk';
import { useAppDispatch, useAppSelector } from '../store';
import '../styles/ToBuyList.css'
import { colorConverter } from '../utils/colorConverter';

export function ToBuyListBoxView() {
    const dispatch = useAppDispatch()
    const toBuyList = useAppSelector(state => state.toBuyList.toBuyList)
    const userName = useAppSelector(state => state.auth.username)
    const userList = useAppSelector(state => state.auth.userList)
    const [deleteTarget, setDeleteTarget] = useState(0)
    const [userID] = userList!.filter(user => user.username === userName).map(user => user.userID)

    function handleAddQuantity(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const itemID = parseInt(e.currentTarget.value)
        let [targetItem] = toBuyList.filter((item) => item.id === itemID)

        dispatch(editItem(targetItem.id!, targetItem.item_name!, targetItem.quantity! + 1, targetItem.remarks, targetItem.handler, targetItem.state!))
    }

    function handleMinusQuantity(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) {
        const itemID = parseInt(e.currentTarget.value)
        let [targetItem] = toBuyList.filter((item) => item.id === itemID)

        if (targetItem.quantity! - 1 === 0) {
            setDeleteTarget(itemID)
            dispatch(triggerAlertModelAction(true))
        } else {
            dispatch(editItem(targetItem.id!, targetItem.item_name!, targetItem.quantity! - 1, targetItem.remarks, targetItem.handler, targetItem.state!))
        }
    }

    const onLongPress = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) => {
        const itemID = parseInt(e.currentTarget.value)
        setDeleteTarget(itemID)
        dispatch(triggerAlertModelAction(true))
    };

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) => {
        handleMinusQuantity(e)
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const longPressEvent = useLongPress({ onLongPress, onClick }, defaultOptions)


    function handleBuyer(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const itemID = parseInt(e.currentTarget.value)
        let [targetItem] = toBuyList.filter((item) => item.id === itemID)
        if (targetItem.handler === userID) {
            dispatch(editItem(targetItem.id!, targetItem.item_name!, targetItem.quantity!, targetItem.remarks, undefined, 'pending'))
        } else {
            console.log(userID)
            dispatch(editItem(targetItem.id!, targetItem.item_name!, targetItem.quantity!, targetItem.remarks, userID, 'taken'))
        }
    }

    function onDelete() {
        dispatch(deleteItem(deleteTarget))
        dispatch(triggerAlertModelAction(false))
        setDeleteTarget(0)
    }

    function onClose() {
        setDeleteTarget(0)
        dispatch(triggerAlertModelAction(false))
    }

    return (
        <>
            <div id="to-buy-list">

                <Grid grow justify="space-between">
                    {
                        toBuyList.map(item =>
                            <Grid.Col key={item.id} span={6} >
                                <Card shadow="sm" p="sm" radius="md" withBorder>
                                    <Group position={'apart'} mt="xs" mb="xs">
                                        <Text weight={500}>{item.item_name}</Text>
                                        <Badge style={{ paddingRight: '0px', paddingLeft: '0px' }} color={item.state === 'pending' ? "pink" : 'blue'} variant="light">
                                            {item.state}
                                        </Badge>
                                    </Group>

                                    <Text size="sm" color="dimmed">
                                        {item.remarks}
                                    </Text>

                                    {
                                        item.handler ?
                                            <Badge style={{ paddingRight: '0px', paddingLeft: '0px' }} color={colorConverter(userList!.filter(user => user.userID === item.handler)[0].username)} variant="light">
                                                By {userList!.filter(user => user.userID === item.handler)[0].username}
                                            </Badge> : null
                                    }

                                    <div >
                                        <Button value={item.id} onClick={(e) => handleBuyer(e)} variant={item.handler ? 'outline' : "subtle"} radius='xl' leftIcon={item.handler ? <IconArrowBackUp size={14} /> : <IconCheck size={14} />}>{item.quantity}</Button>
                                        <Button value={item.id} onClick={(e) => handleAddQuantity(e)} className='buttons plus' variant="light" color="blue" mt="xs" radius='sm'><IconPlus size={14} /></Button>
                                        <Button value={item.id} {...longPressEvent} onClick={(e) => handleMinusQuantity(e)} className='buttons minus' variant="light" color="blue" mt="xs" radius="sm"><IconMinus size={14} /></Button>
                                    </div>

                                </Card>
                            </Grid.Col>
                        )
                    }
                </Grid>
            </div>
            <Button onClick={() => dispatch(triggerNewItemModelAction(true))} style={{ width: '50%' }} id='new-item' variant={'outline'}>New Item</Button>
            <NewItemModel />
            <AlertModal message='Delete this item? Action cannot be reversed' onClose={onClose} onDelete={onDelete} />
        </>
    )
}