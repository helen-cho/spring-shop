import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Row, Col, InputGroup, Button, Form} from 'react-bootstrap'

const ShopUpdate = () => {
    const {pid} = useParams();
    const [form, setForm] = useState("");

    const getShop = async() => {
        const res=await axios(`/shop/read/${pid}`);
        setForm(res.data);
    }

    const {title, lprice, image, fmtdate, maker} = form;

    useEffect(()=>{
        getShop();
    }, []);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(window.confirm("수정하실래요?")){
            await axios.post("/shop/update", form);
            alert("수정완료!");
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품정보수정</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <form className='card p-3' onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>상품번호</InputGroup.Text>
                            <Form.Control value={pid} readOnly/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>상품이름</InputGroup.Text>
                            <Form.Control name="title" value={title} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>상품가격</InputGroup.Text>
                            <Form.Control name="lprice" value={lprice} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>제조사</InputGroup.Text>
                            <Form.Control name="maker" value={maker} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>등록일</InputGroup.Text>
                            <Form.Control value={fmtdate} readOnly/>
                        </InputGroup>
                        <div className='text-center mt-3'>
                            <Button type="submit">정보수정</Button>
                            <Button type="reset" className='ms-2' variant='secondary'>수정취소</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default ShopUpdate