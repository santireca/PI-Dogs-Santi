import { getdogDetail } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
const Detail=()=>{
    const dispatch= useDispatch()
    const {id}= useParams()
    const dogsDetail= useSelector((state)=>state.dogsDetail)

    useEffect(()=>{
        dispatch(getdogDetail(id))
    },[])
    return(
        <div>
            <h1>DETAIL</h1>
            <img src={dogsDetail?.image} alt={dogsDetail?.name}/>
            <h2>name: {dogsDetail?.name}</h2>
            <h3>años de vida: {dogsDetail?.life_span}</h3>
            <h4>peso: {dogsDetail?.weight?.metric}cm</h4>
            <h4>altura: {dogsDetail?.height?.metric}cm</h4>
            <h4>Temperamentos: {dogsDetail?.temperament}</h4>
            <h5>id: {dogsDetail?.id}</h5>
            <Link to={"/home"}><button>Home</button></Link>
        </div>
    )
}

export default Detail