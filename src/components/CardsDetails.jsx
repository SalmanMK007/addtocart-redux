import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { DLT,ADD, REMOVE } from '../redux/actions/Action'


const CardsDetails = () => {

    const [data, setData] = useState([]);

    const { id } = useParams();
    // console.log(id);

    const history = useNavigate();

    const dispatch = useDispatch();


    const getdata = useSelector((state) => state.cartreduce.carts);
    // console.log(getdata); 


    const cpmpare = () => {
        let comparedata = getdata.filter((e) => {
            return e.id == id;
        });
        // console.log(comparedata); 
        setData(comparedata);
    }


    // add data
    const send =(e)=>{
        // console.log(e);
        dispatch(ADD(e));
      }

    const dlt = (id)=>{
        dispatch(DLT(id));
        history("/")
      }

        // remove data
    const remove =(item)=>{
        // console.log(item );
        dispatch(REMOVE(item));
      }


    useEffect(() => {
        cpmpare();
    }, [id])


    return (
        <div className="container mt-2">
            <h2 className='text-center'> Iteams Details Pages</h2>
            <section className='container mt-3'>
                <div className="iteamsdetails ">
                    {
                        data.map((e) => {
                            return (
                                <>
                                    <div className="items_img">
                                        <img src={e.imgdata} alt="" />
                                    </div>
                                    <div className="details">
                                        <Table>
                                            <tr>
                                                <td>
                                                    <p> <strong>Restaurant</strong> : {e.rname}</p>
                                                    <p> <strong>Price</strong> : ₹ {e.price}</p>
                                                    <p> <strong>Dishes</strong> : {e.address}</p>
                                                    <p> <strong>Total</strong> : ₹ {e.price * e.qnty}</p>
                                                    <div className='mt-5  d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#dddd",color:"#111"}}>
                                                        <span style={{fontSize:24}} onClick={e.qnty <=1 ?()=>dlt(e.id) : ()=>remove(e)}>-</span>
                                                        <span style={{fontSize:22}}>{e.qnty}</span>
                                                        <span style={{fontSize:24}} onClick={()=>send(e)}>+</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{e.rating}</span></p>
                                                    <p><strong>Order Review :</strong> <span>{e.somedata}</span></p>
                                                    <p><strong>Remove :</strong> <span> <i className='fas fa-trash' onClick={()=>dlt(e.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i> </span></p>
                                                </td>
                                            </tr>
                                        </Table>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </section>
        </div>
    )
}

export default CardsDetails