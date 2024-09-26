import ExamTest from "@/components/examComp/exam-test";
import BaseLayout from "@/components/layout";
import { message, Tabs } from "antd"; 
import { useEffect, useState } from "react";
import axios from "../../axios-orders";
const Exam = () => {
    const [getData, setData] = useState([]) 
    const [loadingTable, setLoadingTable] = useState(false); 
    useEffect(()=>{ 
        setTimeout(()=>{
            getDatas()
          },800) 
    },[])

    useEffect(()=> {
    },[getData])
    
    const getDatas = () => {   
        const localId = localStorage.getItem("localId");
        const token = localStorage.getItem("idToken");  
        if(!localId){
            return router.push("/")
        }
        setLoadingTable(true) 
        axios.get(`words.json?&auth=${token}&orderBy="localId"&equalTo="${localId}"`).then((res)=>{ 
            const arrayList = Object.entries(res.data).reverse().map(element => { 
            return {
                ...element[1].words, 
                id: element[0] 
              };
            }); 
            const shuffledArrayList = arrayList.sort(() => Math.random() - 0.5); 
            setData(shuffledArrayList); 
        }).catch((err)=>{
            message.error("Error")
        }).finally(()=>{
            setLoadingTable(false)
        }) 
    }

    const items = [
        {
            key: '1',
            label: 'Picture',
            children: <ExamTest id={3} getData={getData}/>,
          },
        {
          key: '2',
          label: 'Korean',
          children: <ExamTest id={1} getData={getData}/>,
        },
        {
          key: '3',
          label: 'Mongolian',
          children: <ExamTest id={2} getData={getData}/>,
        },
      
        {
          key: '4',
          label: 'korean and Mongolian',
          children: <ExamTest id={3} getData={getData}/>,
        },
      ]; 

    return <BaseLayout> 
        <div style={{margin: "0px 20px"}}>
            <Tabs defaultActiveKey="1" items={items}   />


        </div>
    </BaseLayout>
}

export default Exam;