import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Row, Col, Button} from 'react-bootstrap'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const ShopInfo = () => {
    const {pid} = useParams();
    const [shop, setShop] = useState('');
    const {title, maker, image, fmtprice, fmtdate, ucnt} = shop;
    const getShop = async() => {
        const res = await axios(`/shop/info/${pid}?uid=${sessionStorage.getItem("uid")}`);
        setShop(res.data);
    }

    useEffect(()=>{
        getShop();
    }, []);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>[{pid}] 상품정보</h1>
            <Row className='mx-5'>
                <Col md={4}>
                    <img src={`/display?file=${image}`} width="90%" className='image'/>
                </Col>
                <Col className='mt-3'>
                    <h5>
                        [{pid}] {title}
                        <span className='heart mx-2'>
                            {ucnt === 0 ? <FaRegHeart/> : <FaHeart/>}
                        </span>
                    </h5>
                    <hr/>
                    <div>가격: {fmtprice}원</div>
                    <div>제조사: {maker}</div>
                    <div>등록일: {fmtdate}</div>
                    <hr/>
                    <div className='text-center'>
                        <Button variant='warning' className='px-5'>바로구매</Button>
                        <Button variant='success' className='px-5 ms-3'>장바구니</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ShopInfo