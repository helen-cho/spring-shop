import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Row, Col, Table, Spinner, InputGroup, Form, Button} from 'react-bootstrap'

const ShopList = () => {
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const getList = async() => {
        setLoading(true);
        const res=await axios.get(`/shop/list.json?page=1&size=5&query=`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    }, []);    

    if(loading) return <div className='text-center my-5'><Spinner/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품목록</h1>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <td>ID</td><td>상품명</td><td>상품가격</td><td>제조사</td><td>등록일</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s=>
                        <tr key={s.pid}>
                            <td>{s.pid}</td>
                            <td>{s.title}</td>
                            <td className='text-end'>{s.fmtprice}원</td>
                            <td>{s.maker}</td>
                            <td>{s.fmtdate}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default ShopList