 
import axios from "../../axios-orders";
import { useEffect, useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Spin, Typography, Breadcrumb } from 'antd'; 
import Highlighter from 'react-highlight-words';
import AddRegistration from "@/components/registrationComp/addRegistration";
import BaseLayout from "@/components/layout";
import RegEdit from "@/components/registrationComp/edit";
import RegDelete from "@/components/registrationComp/delete";
import css from "./style.module.css"
import { useRouter } from "next/router";
const { Paragraph } = Typography;

const Registration = () =>{
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [getData, setData] = useState([]) 
    const [loadingTable, setLoadingTable] = useState(false); 
    const router = useRouter(); 
    useEffect(()=>{
        setTimeout(()=>{
          getRegistrationList();
        },800) 
    },[])
    const getRegistrationList = () =>{
      setLoadingTable(true);
      const localId = localStorage.getItem("localId");
      if(localId){
          setLoading(false);
      }else{
          setLoading(true);
      }
      const token = localStorage.getItem("idToken");
      const localId2 = localStorage.getItem("localId");

      axios.get(`registration.json?&auth=${token}&orderBy="localId"&equalTo="${localId2}"`).then((res)=>{ 
          const data = Object.entries(res.data).reverse(); 
          setData(data)  
      }).catch((err)=>{
          console.log("err: ", err)
      }).finally(()=>{
        setLoadingTable(false)
      })
    } 
    const data = getData.map((e, i)=>( 
      {
        key: i,
        title: e[1].values.title,
        username: e[1].values.username,
        email: e[1].values.email,
        password: e[1].values.password,
        description: e[1].values.description,
        phone: e[1].values.phone,
        action: e[0],
        allData: e
      }
    ))  
    
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
        dataIndex: 'key',
        key: 'key',
        width: '20px',
        ellipsis: true,
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '70px',
        ellipsis: true,
        ...getColumnSearchProps('title'),
        render: (a)=> <div style={{display: "flex"}}> 
                        <Paragraph copyable={{text: a }}></Paragraph>
                        <div style={{paddingLeft: "5px"}}>{a}</div>
                      </div>
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '70px',
        ellipsis: true,
        ...getColumnSearchProps('username'),
        render: (a)=> <div style={{display: "flex"}}> 
                        <Paragraph copyable={{text: a }}></Paragraph>
                        <div style={{paddingLeft: "5px"}}>{a}</div>
                      </div>
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '100px',
        ellipsis: true,
        ...getColumnSearchProps('email'),
        render: (a)=> <div style={{display: "flex"}}> 
                        <Paragraph copyable={{text: a }}></Paragraph>
                        <div style={{paddingLeft: "5px"}}>{a}</div>
                      </div>
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '45px',
        ellipsis: true,
        ...getColumnSearchProps('phone'),
        render: (a)=> <div style={{display: "flex"}}> 
                        <Paragraph copyable={{text: a }}></Paragraph>
                        <div style={{paddingLeft: "5px"}}>{a}</div>
                      </div>
      },
      {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
        width: '100px',
        ellipsis: true,
        ...getColumnSearchProps('password'),
        render: (a)=> <div style={{display: "flex"}}> 
                        <Paragraph copyable={{text: a }}></Paragraph>
                        <div style={{paddingLeft: "5px"}}>
                          <Input.Password value={a} size="small"/>
                        </div>
                      </div>
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '70px',
        ellipsis: true,
        ...getColumnSearchProps('description'),
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
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
        render: (rec)=> <div style={{display: "flex", gap: "10px"}}>  
                <RegEdit data={rec[0]} getRegistrationList={getRegistrationList} info={rec[1].values}/>
                <RegDelete  data={rec[0]} getRegistrationList={getRegistrationList}/>  
          </div> 
      },
    ];
 
    return<BaseLayout> 
            {loading ?  <Spin />
            : 
            <div>  <Breadcrumb
            items={[ 
              {title: <Button size="small" type="ghost" onClick={()=>router.push("/")}>Home</Button>}, 
              {title: 'Registration'}]}/>
            <div className={css.Formcss}>  
                <AddRegistration getRegistrationList={getRegistrationList}/>
                <Table columns={columns} dataSource={data}  scroll={{y: 300, x: 1200}} loading={loadingTable} style={{marginLeft: "10px"}} size="small" pagination={{ total: 0, showTotal: (total) => `Total: ${total} items` }} />
               
            </div>
            </div>
            }
    </BaseLayout>
}
export default Registration