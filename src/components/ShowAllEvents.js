import { CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';


const ShowAllEvents = ({ events }) => {
    return (
        <div>
            {events && events.map((element, index) => {
                return (
                    <div key={`ed-${index}`} className='event-card-div'>
                        <CCard className='event-card'>
                            <CCardHeader key={`e-${index}`} component="h5"
                                className={element.type === "work" ? 'work-card' : 'personal-card'}
                                style={{ textTransform: "capitalize" }}
                            >
                                {element.title}</CCardHeader>
                            <CCardBody>
                                <CCardTitle key={`et-${index}`}
                                    style={{
                                        textTransform: "capitalize",
                                        fontSize: "20px"
                                    }}>{element.type}</CCardTitle>
                                <CCardText key={`ets-${index}`} style={{ textTransform: "capitalize", fontStyle: "italic" }}>{element.startTime} - {element.endTime} <br />
                                    <p style={{
                                        fontStyle: "normal",
                                        marginTop: "3px",
                                        fontWeight: "bold",
                                        fontSize: "15px"
                                    }}>{element.priority}</p></CCardText>
                                < CButton href={`/edit/${element._id}`
                                } > Edit</CButton>
                            </CCardBody>
                        </CCard>
                    </div>
                );
            })}


        </div>
    )
}

export default ShowAllEvents;