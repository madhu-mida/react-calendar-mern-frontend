import { CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';

import { MdModeEditOutline } from "react-icons/md";
import { FcHighPriority, FcLowPriority } from "react-icons/fc"
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const ShowAllEvents = ({ events }) => {
    const navigate = useNavigate();
    return (
        <div>
            {events && events.map((element, index) => {
                return (
                    <div key={`ed-${index}`} className='event-card-div'>
                        <CCard className='event-card'>
                            <CCardHeader key={`e-${index}`} component="h6"
                                className={element.type === "work" ? 'work-card' : 'personal-card'}
                                style={{ textTransform: "capitalize", paddingLeft: "7px" }}
                            >
                                <div className='card-title-edit'>
                                    <div className='card-title-priority'>
                                        <IconContext.Provider value={{ color: "white", size: "1.2em" }} >
                                            {element.priority === "low" ? <FcLowPriority style={{ marginRight: "5px" }} /> : <FcHighPriority style={{ marginRight: "5px" }} />}
                                        </IconContext.Provider>
                                        {element.title}
                                    </div>
                                    <IconContext.Provider value={{ color: "white", size: "1.2em" }}>
                                        <div>
                                            <a href="#"
                                                onClick={() => { navigate(`/edit/${element._id}`) }}><MdModeEditOutline /></a>
                                        </div>
                                    </IconContext.Provider>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <CCardTitle key={`et-${index}`}
                                    style={{
                                        textTransform: "capitalize",
                                        fontSize: "14px"
                                    }}>{element.description}</CCardTitle>
                                <CCardText key={`ets-${index}`} style={{
                                    textTransform: "capitalize", fontStyle: "italic",
                                    fontSize: "14px"
                                }}>{element.startTime} - {element.endTime} <br />
                                </CCardText>

                            </CCardBody>
                        </CCard>
                    </div>
                );
            })}


        </div>
    )
}

export default ShowAllEvents;