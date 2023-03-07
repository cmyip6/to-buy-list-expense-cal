import './App.css';
import { AppShell } from '@mantine/core';
import { ToBuyList } from './pages/ToBuyList';
import { useAppDispatch, useAppSelector } from './store';
import { ExpenseSummary } from './pages/ExpenseSummary';
import { Route, Routes } from "react-router-dom";
import { Auth } from './pages/Auth';
import { MyNavBar } from './components/MyNavBar';
import { Record } from './pages/Record';
import { useEffect } from 'react';
import { getUserList } from './redux/auth/thunk';

function App() {
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()
	
	useEffect(()=>{
        dispatch(getUserList())
    },[])
	
	return (
		<div className="App">
			{isLoggedIn ? (
				<AppShell>
					<MyNavBar />
					<Routes>

						<Route path="/*" element={<ExpenseSummary />} />
						<Route path="/toBuyList/*" element={<ToBuyList />} />
						<Route path="/expenseSummary" element={<ExpenseSummary />} />
						<Route path="/record" element={<Record />} />

					</Routes>
				</AppShell>
			): <Auth />}
		</div>
	);
}

export default App;
