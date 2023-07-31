import { useEffect, useState } from "react";
import {a, b} from './data.js'
import axios from 'axios'

export default function ProfileDetail() {
    let [profile, setProfile] = useState();
    let [profiles, setProfiles] = useState([]);
    
    const generalNo = 1;
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/profile/${generalNo}`)
        .then((res)=>{
            setProfiles(res.data);
            setProfile(profiles[0]);
            console.log(profiles);
        })
        .catch(()=>{
            console.log('프로필 목록 가져오기 실패')
        });
    }, [profile])
    


    
    return(
        <div>

            {/* <button onClick={()=>{
                axios.get('http://localhost:8000/api/profile/detail/9')
                .then((결과)=>{
                    console.log(결과.data.data);
                })
                .catch(()=>{
                    console.log('데이터 가져오기 실패')
                })
            }}>버튼</button>
            <button onClick={()=>{
                axios.delete('http://localhost:8000/api/profile/9')
                .then(()=>{
                    let copy = [...profiles];
                    setProfiles(copy);
                })
                .catch(()=>{
                    console.log('프로필 삭제 실패')
                })
            }}>삭제</button> */}
            {
                profiles.map((data, index) => {
                    console.log(data)
                })
            }
        </div>
    );
}