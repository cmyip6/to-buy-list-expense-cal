import { useNavigate, useParams } from 'react-router-dom';
import { Button, Group, Tabs } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import '../styles/MyNavBar.css'
import { logoutAction } from '../redux/auth/slice';
import { useAppDispatch, useAppSelector } from '../store';

export function MyNavBar() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username)


  const handleTabChange = (value: any)=>{
    navigate(`/${value}`)
  }

  return (
    <>
      <div id='nav-bar'>
        <Tabs defaultValue={tabValue} value={tabValue} onTabChange={(value) => handleTabChange(value)}>
          <Tabs.List position="center">
            <Tabs.Tab value="toBuyList">To Buy List</Tabs.Tab>
            <Tabs.Tab value="expenseSummary">Expense Summary</Tabs.Tab>
            <Tabs.Tab value="record">Record</Tabs.Tab>
          
          </Tabs.List>
        </Tabs>
      </div>
      
      <Group id='bottom-box-container' position={'apart'} mt="xs" mb="xs">
        <Button id='greet-box' variant={'subtle'}>Hello, {username?.toUpperCase()}</Button>
        <Button onClick={() => dispatch(logoutAction())} id='logout-button' variant={"outline"} leftIcon={<IconLogout size={18} />}>Logout</Button>
      </Group>

    </>
  );
}