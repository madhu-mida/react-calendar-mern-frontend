import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { format } from "date-fns";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import ShowAllEvents from "../components/ShowAllEvents";
import CurrentDay from "../components/CurrentDay";
import { useNavigate } from "react-router-dom";




const CalendarView = () => {
    const [today, setToday] = useState(new Date());

    const days = [];
    const weekDates = [];

    const navigate = useNavigate();

    const URL = "https://ms-react-mern-calendar.herokuapp.com/";

    for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i)
        days.push(format(date, "ccc"))
        weekDates.push(format(date, "MM-dd-yyyy"))
    }

    //console.log(days)
    //console.log(weekDates)

    const [isActive, setIsActive] = useState(false);



    const handleClick = (dateData) => {
        console.log(dateData)
        setSelectedDate(dateData);
    }

    const [events, setEvents] = useState(null)

    const [selectedDate, setSelectedDate] = useState(format(new Date(), "MM-dd-yyyy"))

    const getEvents = async () => {
        const data = await fetch(URL + "getEventByDate/" + selectedDate).then(res => res.json());
        setEvents(data)
    }

    useEffect(() => { getEvents() }, [selectedDate])

    return (
        <div>
            <div className="calendar-title">
                <h1>Calendar</h1>
                <div className="add-button" >
                    <IconContext.Provider value={{ color: "yellow", size: "2em" }}>
                        <div>
                            <a href="#" onClick={() => { navigate(`/event/${selectedDate}`) }}><AiOutlinePlus /></a>
                        </div>
                    </IconContext.Provider>
                </div>

            </div>
            <CurrentDay />
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    {days.map((element, index) => {
                        return (
                            <Col className="day-title">{element}</Col>
                        );
                    })}
                </Row>

                <Row>
                    {
                        weekDates.map((element, index) => {
                            return (
                                <Col>
                                    <button className="date-button"
                                        key={`date-button-${index}`}
                                        style={{ backgroundColor: selectedDate === element ? 'green' : '' }}
                                        onClick={() => { handleClick(element) }}
                                    >{element.split('-')[1]}</button></Col>
                            );
                        })
                    }
                </Row>
            </Container>

            <ShowAllEvents events={events} />
        </div>
    );
}

export default CalendarView;