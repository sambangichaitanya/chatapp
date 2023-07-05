import React ,{ forwardRef } from 'react'
import { Card , CardContent , Typography } from '@mui/material'
import './Message.css'

const Message = forwardRef(({username,message} , ref) => {
  const isuser = (message.username===username)
  return (
    <div ref={ref} className={`message ${isuser&&'message_user'}`}>
      <Card className={isuser ? "message_usercard" : "message_guestCard"}>
        <CardContent className='one'>
          <Typography color="black" variant="h5" component="h2">
           {!isuser&&`${message.username || "anonymous user"}: `} {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
      
  );
});

export default Message;