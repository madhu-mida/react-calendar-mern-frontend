import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { format } from "date-fns";
import { IconContext } from "react-icons";
import { AiFillPlusCircle } from "react-icons/ai";
import ShowAllEvents from "../components/ShowAllEvents";




const CalendarView = () => {
    const [today, setToday] = useState(new Date());

    const days = [];
    const weekDates = [];

    const URL = "http://localhost:4000/";

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
                    <IconContext.Provider value={{ color: "yellow", size: "3em" }}>
                        <div>
                            <a href={`/event/${selectedDate}`}><AiFillPlusCircle /></a>
                        </div>
                    </IconContext.Provider>
                </div>

            </div>
            <Container>
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