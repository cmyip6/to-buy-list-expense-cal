import React, {  useEffect, useState } from 'react';
import { createStyles } from '@mantine/core';
import SwitchSelector from "react-switch-selector";
import { ToBuyListBoxView } from '../components/ToBuyListBoxView';
import { ToBuyListListView } from '../components/ToBuyListListView';
import { IconCalculator } from '@tabler/icons';
import { useAppDispatch } from '../store';
import { getToBuyList } from '../redux/toBuyList/thunk';

const useStyles = createStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoChild: {
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggle: {
        width: 250,
        height: 40,
        margin: "20px 0",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export function ToBuyList() {
    const [value, setValue] = useState("box");
    const { classes, theme } = useStyles();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getToBuyList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleOptions = [
        {
            label: "Box View",
            value: "box",
            selectedBackgroundColor: theme.white
        },
        {
            label: "List View",
            value: "list",
            selectedBackgroundColor: theme.white
        }
    ];

    const onChange = (newValue: any) => {
        setValue(newValue);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.toggle}>
                <SwitchSelector
                    onChange={onChange}
                    options={toggleOptions}
                    initialSelectedIndex={0}
                    backgroundColor={theme.colors.itemInputBorderColor[0]}
                    fontColor={theme.white}
                    selectedFontColor={theme.black}
                    fontSize={15}
                    optionBorderRadius={20}
                />
            </div>
            {
                value === "box"
                ? <ToBuyListBoxView />
                : <ToBuyListListView />
            }
        </div>
    )
}