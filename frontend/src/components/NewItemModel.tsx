import { Modal, Button, Group, Input, Textarea, NumberInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { triggerNewItemModelAction } from '../redux/toBuyList/slice';
import { addNewItem } from '../redux/toBuyList/thunk';
import { useAppDispatch, useAppSelector } from '../store';

export function NewItemModel() {
    const dispatch = useAppDispatch()
    const opened = useAppSelector(state => state.toBuyList.triggerNewItemModel)
    const [itemName, setItemName] = useState('')
    const [remarks, setRemarks] = useState('')
    const [quantity, setQuantity] = useState(1)

    function handleSubmit(){
        if(itemName.length){
            dispatch(addNewItem(itemName, quantity, remarks))
            dispatch(triggerNewItemModelAction(false))
        } else {
            showNotification({
                title: 'Add New Item Notification',
                message: 'Please Enter Item Name'
            })
        }
    }


    return (
        <>
            <Modal
                opened={opened}
                centered
                onClose={() => dispatch(triggerNewItemModelAction(false))}
                title="Add New Item"
            >

                <Input.Wrapper label="Item Name" required >
                    <Input value={itemName} component="input"
                        onChange={(e) => setItemName(e.target.value)}>
                    </Input>
                </Input.Wrapper>

                <Input.Wrapper label="Quantity" >
                    <NumberInput
                        value={quantity}
                        onChange={(e) => setQuantity(e!)}
                    />
                </Input.Wrapper>

                <Input.Wrapper label="Remarks" >
                    <Textarea
                        onChange={(event) => setRemarks(event.currentTarget.value)}
                        value={remarks}
                        autosize
                        minRows={3}
                    />
                </Input.Wrapper>

                <Group position="center" mt="xl">
                    <Button 
                        fullWidth
                        variant="outline" 
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Confirm
                    </Button>
                </Group>

            </Modal>
        </>
    );
}