import { useEffect, useState } from 'react'
import './Ui.css'
import { MdDelete, MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, addData, delUser, handleCurrentSel, addToken, filterByCompany } from '../../features/actionsTypes';
import { Link } from 'react-router-dom';

const msgDiv = {
    margin: "40px auto",
    width: "50%",
    textAlign: "center",
    fontWeight: "700"
}

export const Ui = () => {
    const [showList, setshowList] = useState(false);
    const [showList2, setshowList2] = useState(false)
    const Dispatch = useDispatch()
    const [addnewDataWindow, setaddnewDataWindow] = useState(false)
    const [temp, setTemp] = useState(null);
    const getCurrentDate = () => {
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() + 1;
        let cYear = currentDate.getFullYear();
        return `${cDay}/${cMonth}/${cYear}`;
    }
    const [userInfoChange, setUserInfoChange] = useState(null)

    let { usersData, currentSelection, token } = useSelector((state) => {
        return {
            usersData: state.usersData,
            currentSelection: state.currentSelection,
            token: state.token
        }
    })

    const getUsersData = () => {
        fetch("http://localhost:3004/user")
            .then(res => res.json())
            .then((res) => {
                Dispatch(addData(res))
                setTemp(res)
            })
            .catch(err => console.log(err.message))
    }

    const handleDelete = (idIs) => {
        Dispatch(delUser(idIs))
    }

    const handleEditSubmit = () => {
        setaddnewDataWindow(!addnewDataWindow)
        if (userInfoChange.name !== "" || userInfoChange !== null)
            Dispatch(addUser(userInfoChange))
        setUserInfoChange(null)
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setUserInfoChange({ ...userInfoChange, [name]: value, last_updated: getCurrentDate(), id: Math.floor((Math.random() * 1000000) + 1) })
    }


    const [toggleSel, settoggleSel] = useState(false)
    const toggleSelected = () => {
        settoggleSel(!toggleSel)
        var inputs = document.getElementsByTagName('input');
        if (toggleSel) {
            for (var i = 0; i <= temp.length; i++) {
                if (inputs[i].type == 'checkbox') {
                    inputs[i].checked = false;
                }
            }
        } else {
            for (var i = 0; i <= temp.length; i++) {
                if (inputs[i].type == 'checkbox') {
                    inputs[i].checked = true;
                }
            }
        }
    }

    const handleAddMember = () => {
        setaddnewDataWindow(true)
    }

    const handleStatusFilter = (key) => {
        usersData = temp.filter((el) => {
            if (el.status.includes(key)) return el
        })
        Dispatch(addData(usersData))
    }

    const handleLogout = () => {
        Dispatch(addToken(null))
    }

    const [toggleSelCompany, setToggleSelCompany] = useState(false)
    const handleCompanyFilter = (key) => {
        if (key == "All") {
            console.log("yahan kuukukuku", toggleSelCompany);
            let key = 'All'
            Dispatch(handleCurrentSel({ key, temp }))
            let inputs = document.getElementsByClassName('companyFilter');
            if (toggleSelCompany) {
                key = "reset"
                console.log("yahan if mai", key)
                Dispatch(handleCurrentSel({ key, temp }))
                for (var i = 0; i < 4; i++) {
                    if (inputs[i].type == 'checkbox') {
                        inputs[i].checked = false;
                    }
                }
            } else {
                key = "selAll"
                console.log("yahan else mai", key)
                Dispatch(handleCurrentSel({ key, temp }))
                for (var i = 0; i < 4; i++) {
                    if (inputs[i].type == 'checkbox') {
                        inputs[i].checked = true;
                    }
                }
            }
        }else{
            let inputs = document.getElementsByClassName('optionAll');
            inputs[0].checked = false;
            Dispatch(handleCurrentSel({key,temp}))
        }
        setToggleSelCompany(!toggleSelCompany)

    }
    console.log(currentSelection)

    useEffect(() => {
        getUsersData()
    }, [])



    return <>
        {token ? <div>
            <div onClick={handleLogout} className='logoutBtn'>Logout</div>
            <div className='addMemberContainer'>
                <div>Team Members</div>
                <div onClick={handleAddMember} className='addMemberBtn'>Add Members <AiOutlinePlus className='addMemberIcon' /></div>
            </div>
            <div className='filterContainer'>
                <div className='companyListContainer' onClick={() => setshowList(!showList)}>company ({currentSelection.size})
                </div>
                {showList ? <div className="companyList">
                    <div><input className='companyFilter' onChange={() => handleCompanyFilter("DC united")} type="checkbox" name="" id="" />DC united</div>
                    <div><input className='companyFilter' onChange={() => handleCompanyFilter("manchaster united")} type="checkbox" name="" id="" />manchaster united</div>
                    <div><input className='companyFilter' onChange={() => handleCompanyFilter("LA galaxy")} type="checkbox" name="" id="" />LA galaxy</div>
                    <div><input className='companyFilter optionAll' onChange={() => handleCompanyFilter("All")} type="checkbox" name="" id="" />All</div>
                </div> : null}
                <div className='filterListContainer' onClick={() => setshowList2(!showList2)}>status
                    {showList2 ? <div className="FliterList">
                        <div onClick={() => handleStatusFilter("")}>all</div>
                        <div onClick={() => handleStatusFilter("active")}>active</div>
                        <div onClick={() => handleStatusFilter("closed")}>inactive</div>
                    </div> : null}
                </div>
            </div>
            {addnewDataWindow ?
                <div className='infoEditDivContainer'>
                    <div className='infoEditDiv'>
                        <div>Add Members</div>
                        <div className='AddMemberCancel'><MdOutlineCancel onClick={handleEditSubmit} /></div>
                        <div><input onChange={handleInputChange} type="text" name="name" placeholder='name' /></div>
                        <div><input onChange={handleInputChange} type="text" name="company" placeholder='company' /></div>
                        <div><input onChange={handleInputChange} type="text" name="status" id="" placeholder='status' /></div>
                        <div><input onChange={handleInputChange} type="text" name="notes" id="" placeholder='notes' /></div>
                        <div className='saveCancelBtnContainer'>
                            <button className='cnclBtn' onClick={() => handleEditSubmit()}>cancel</button><button className='saveCnclBtn' onClick={() => handleEditSubmit()}>save</button>
                        </div>
                    </div>
                </div> : null
            }
            <div>
                <div className='UiColumnParent'>
                    <div className='UiColChild'><input onChange={toggleSelected} type="checkbox" name="" id="" /></div>
                    <div className='UiColChild'>Name</div>
                    <div className='UiColChild'>Company</div>
                    <div className='UiColChild'>status</div>
                    <div className='UiColChild'>Last updated</div>
                    <div className='UiColChild'>Notes</div>
                    <div className='UiColChild'></div>
                </div>
            </div>
            {usersData.length > 0 ? usersData.map((el) => (
                <div className='UiRowParent'>
                    <div className='UiRowChild'><input type="checkbox" name="checkbox" id="" /></div>
                    <div className="UiRowChild">{el.name}</div>
                    <div className="UiRowChild">{el.company}</div>
                    <div className="UiRowChild">{el.status}</div>
                    <div className="UiRowChild">{el.last_updated}</div>
                    <div className="UiRowChild">{el.notes}</div>
                    <div className="UiRowChild editDelete" onClick={() => { handleDelete(el.id) }}><MdDelete className='editIcons iconDelete' /></div>
                </div>
            )) : <div className='noData'>Nothing to show</div>}
        </div> : <div style={msgDiv}> <Link to="/login">Login</Link> First</div>}
    </>
}