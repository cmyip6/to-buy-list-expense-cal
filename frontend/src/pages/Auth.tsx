import { Button, Container } from "@mantine/core";
import { login } from "../redux/auth/thunk";
import { useAppDispatch, useAppSelector } from "../store";
import '../styles/Auth.css'

export function Auth (){
    const userList = useAppSelector((state)=> state.auth.userList)
    const dispatch = useAppDispatch()

    const onClickAction = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        localStorage.setItem('username', e.currentTarget.value)
        dispatch(login(e.currentTarget.value))
    }

    return(
        <Container className="button-hub">
            Who Are You?
            {
                userList!.map((user)=>
                     <Button
                        variant="outline"
                        key={user.userID} 
                        value={user.username}
                        onClick={(e)=>onClickAction(e)}
                        >
                            {user.username.toUpperCase()}
                        </Button>
                )
            }
        </Container>
    )
}