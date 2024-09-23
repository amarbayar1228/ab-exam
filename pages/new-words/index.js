 
import axios from "../../axios-orders";
import { useEffect, useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,   Typography, Breadcrumb, Image, DatePicker, message } from 'antd'; 
import Highlighter from 'react-highlight-words';
import BaseLayout from "@/components/layout"; 
import css from "./style.module.css"
import { useRouter } from "next/router";
import Add from "@/components/wordsComp/add";
import Delete from "@/components/wordsComp/delete";
import moment from "moment";
const { Paragraph } = Typography;

const Registration = () =>{ 
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [getData, setData] = useState([]) 
    const [loadingTable, setLoadingTable] = useState(false); 
    const [datePicker,setDatePicker] = useState(moment().format("YYYY-MM-DD") ); 
    const router = useRouter(); 
    useEffect(()=>{
        setTimeout(()=>{
          axiosData();
        },800) 
    },[])
    const axiosData = () =>{  
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
        setData(arrayList); 
      }).catch((err)=>{
         message.error("Error")
      }).finally(()=>{
        setLoadingTable(false)
      })
    } 
 
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{padding: 8,}}onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{width: 90,}}>Search</Button>
            <Button onClick={() => clearFilters && handleReset(clearFilters)}size="small"style={{width: 90,}}>Reset</Button> 
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns = [
      {
        title: '№',
        dataIndex: 'id',
        key: 'id',
        width: '8px',
        render: (_, __, index) => (
          index + 1 
        ),
      },
      {
        title: 'date',
        dataIndex: 'date',
        key: 'date',
        width: '20px',
        ellipsis: true,
        ...getColumnSearchProps('date'),
        render: (a)=> <div style={{display: "flex"}}> 
                        <Paragraph copyable={{text: a }}></Paragraph>
                        <div style={{paddingLeft: "5px"}}>{a}</div>
                      </div>
      },
      
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      width: "10px",
      render: (_, b) => (
        <div>  
          <Image 
            src={b.image} 
            width={50} 
          />
        </div>
      ),
      ellipsis: true,
    },
      {
        title: 'korean',
        dataIndex: 'koreanName',
        key: 'koreanName',
        width: '20px',
        ellipsis: true,
        ...getColumnSearchProps('koreanName'),
        render: (a)=> <div style={{display: "flex"}}> 
                        <Paragraph copyable={{text: a }}></Paragraph>
                        <div style={{paddingLeft: "5px"}}>{a}</div>
                      </div>
      },
      {
        title: 'Mongol',
        dataIndex: 'mongolName',
        key: 'mongolName',
        width: '30px',
        ellipsis: true,
        ...getColumnSearchProps('mongolName'),
        render: (a)=> <div style={{display: "flex"}}> 
                        <Paragraph copyable={{text: a }}></Paragraph>
                        <div style={{paddingLeft: "5px"}}>{a}</div>
                      </div>
      }, 
      {
        title: 'Action',
        dataIndex: 'allData',
        key: 'allData',
        width: '40px',
        render: (a, b)=> <div style={{display: "flex", gap: "10px"}}>   
            <Delete id={b.id} axiosData={axiosData}/>  
          </div> 
      },
    ];
    const onChange = (date, dateString) => {
      setDatePicker(dateString) 
    };
    return<BaseLayout>   
            <div> 
              <Breadcrumb
                items={[ 
                {title: <Button size="small" type="ghost" onClick={()=>router.push("/")}>Home</Button>}, 
                {title: 'New words'}]}
              />
            <div className={css.Formcss}>  
                <Add axiosData={axiosData}/> 
                <DatePicker onChange={onChange} />
                <Table columns={columns} dataSource={getData.filter((e)=> e.date === datePicker)} 
                  scroll={{y: 300, x: 800}}
                  loading={loadingTable}
                  style={{marginLeft: "10px"}} size="small" 
                  pagination={{ total: 0, showTotal: (total) => `Total: ${total} words` }} 
                /> 
            </div>
            </div> 
    </BaseLayout>
}
export default Registration