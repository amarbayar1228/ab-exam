import { Button, DatePicker, Image, Input, Modal } from "antd";  
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { EffectCards } from 'swiper/modules'; 
import { useState } from "react"; 
import moment from "moment";

const ExamTest = ({ id, getData }) => {
    const [datePicker, setDatePicker] = useState(moment().format("YYYY-MM-DD")); 
    const [start, setStart] = useState(false); 
    const [inputValues, setInputValues] = useState({}); // State to hold input values 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState();

    const onChange = (date, dateString) => {
        setDatePicker(dateString); 
    };

    const handleInputChange = (index, value, koreanName) => {
        setInputValues(prev => ({
            ...prev,
            [index]: { value, koreanName, result: {bad: 0, good: 0} } // Store both value and koreanName
        }));
    };
    
    const end = () => { 
        setIsModalOpen(true) 
        const result2 = { bad: 0, good: 0 }; // Initialize counts 

        Object.values(inputValues).forEach(element => { 
            if (element.koreanName === element.value) { 
                result2.good += 1;  
            } else {
                result2.bad += 1;  
            }
        }); 
         setResult(result2)
    }; 
    return (
        <div style={{ width: "300px" }}> 
            <div style={{ marginBottom: "40px" }}>
                <DatePicker onChange={onChange} showNow />
                <Button type="primary" onClick={() => setStart(true)}>Эхлэх</Button>
            </div>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            > 
                {getData?.filter(e => e.date === datePicker)?.map((data, i) => (
                    <SwiperSlide key={i}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px"
                        }}> 
                            <Image
                                src={data.image} 
                                width={300}
                                height={200}
                            />
                            {/* <div>{data.koreanName}</div> */}
                            <Input 
                                placeholder="here..." 
                                allowClear 
                                style={{ width: "190px" }}
                                value={inputValues[i]?.value || ''} // Access the value from the state
                                onChange={(e) => handleInputChange(i, e.target.value, data.koreanName)} 
                            />
                        </div>
                    </SwiperSlide> 
                ))}
                <div style={{ marginTop: "20px" }}>
                    <Button type="primary" onClick={end}>Дуусгах</Button>
                </div>
            </Swiper>

            <Modal title="Exam" open={isModalOpen} onOk={()=> setIsModalOpen(true)} onCancel={()=> (setIsModalOpen(false), setInputValues({}))} footer={null}>

                {Object.values(inputValues)?.map((e, i)=> (
                  <div key={i}>
                      <div style={{display: "flex", gap: "20px", borderBottom: "1px solid #ccc"}}> 
                        <div>{i}</div>
                        <div style={{display: "flex"}}> 
                            <div style={{borderRight: "1px solid #ccc", width: "100px", marginRight: "20px"}}>{e.koreanName}</div> 
                            <div style={e.koreanName === e.value ? {color: "green"} : {color: "red"}}>{e.value}</div>
                        </div>
                      </div>
                      
                  </div>
                ))}

              <div style={{display: "flex", gap: "20px", marginTop: "20px", borderTop: "5px solid #ccc", paddingTop: "5px"}}>
                <div>Total: {Object.keys(inputValues).length}</div>
                <div style={{color: "green"}}>Answer: {result?.good}</div>
                <div style={{color: "red"}}>Wrong: {result?.bad}</div>
              </div>
            </Modal>
        </div>
    );
};

export default ExamTest;
