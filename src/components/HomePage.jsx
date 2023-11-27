import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
    const size=6;
    const page=1;
    const [query, setQuery] = useState("");

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const getList = async() => {
        setLoading(true)
        const res=await axios(`/shop/list.json?page=${page}&size=${size}&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    }, []);

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <Row>
                <Col>
                    <span>상품수: {total}개</span>
                </Col>
            </Row>
            <Row>
                {list.map(shop=>
                    <Col key={shop.pid} xs={6} md={4} lg={2} className='mb-3'>
                        <Card>
                            <Card.Body>
                                <img src={`/display?file=${shop.image}`} width="90%"/>
                                <div className='ellipsis'>{shop.title}</div>
                                <div className='price'>{shop.fmtprice}원</div>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    )
}

export default HomePage