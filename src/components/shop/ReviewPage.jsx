import React, { useState } from 'react'
import {Button, Form} from 'react-bootstrap'

const ReviewPage = ({pid}) => {
    const [body, setBody] = useState('');
    const onRegister = () => {
        if(body===""){
            alert("리뷰내용을 작성하세요!");
        }else{
            const data={pid, uid:sessionStorage.getItem("uid"), body}
            console.log(data);
        }
    }

    return (
        <div>
            {sessionStorage.getItem("uid") ?
                <div>
                    <Form.Control onChange={(e)=>setBody(e.target.value)} value={body}
                        as="textarea" rows={5} placeholder='리뷰내용을 입력하세요.'/>
                    <div className='text-end mt-2'>
                        <Button onClick={onRegister}
                            className='btn-sm px-5'>등록</Button>
                    </div>    
                </div>
                :    
                <div>
                    <Button className='w-100'>로그인</Button>
                </div>    
            }
        </div>
    )
}

export default ReviewPage