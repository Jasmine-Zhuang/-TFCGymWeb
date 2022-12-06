import {useContext, useEffect, useState} from "react";
import ClassInstancesTable from "./ClassInstancesTable";
import ClassInstancesAPIContext from "../../Contexts/ClassInstancesAPIContext";
import { useNavigate } from "react-router-dom";

const ClassInstances = () => {
    const navigate = useNavigate();
    const toFilter = (method)=>{
        navigate('/classes/filter', { state: { method:method } })
    }
    const perPage = 10;
    const [params, setParams] = useState({page: 1});
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const { setClassInstances } = useContext(ClassInstancesAPIContext);
    useEffect(() => {
        const { page } = params;
        fetch(`http://localhost:8000/classes/3/all?page=${page}&per_page=${perPage}`)
            .then(res => res.json())
            .then(json => {
                setClassInstances(json.results);
                json.next?setHasNext(true):setHasNext(false);
                json.previous?setHasPrev(true):setHasPrev(false);
            })
    }, [params])

    return (
        <>
            <button onClick={() => toFilter('coach')}> filter by coach </button>
            <button onClick={() => toFilter('class_name')}> filter by class name </button>
            <button onClick={() => toFilter('date')}> filter by class date </button>
            <button onClick={() => toFilter('time_range')}> filter by range of class start time </button>
            <ClassInstancesTable perPage={perPage} params={params} />
            <button hidden={!hasPrev}
                onClick={() => setParams({
                ...params,
                page: Math.max(1, params.page - 1)
            })}>
                prev
            </button>
            <button hidden={!hasNext}
                onClick={() => setParams({
                ...params,
                page: params.page + 1
            })}>
                next
            </button>
        </>
    )
}

export default ClassInstances;