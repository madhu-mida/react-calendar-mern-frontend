import { createEvent } from "@testing-library/react";
import { React, useEffect, useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { Dropdown, Selection } from 'react-dropdown-now';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { format, parseISO } from "date-fns";

const CalendarEventForm = (props) => {

    const { id, date } = useParams();

    const [form, setForm] = useState({
        date: date,
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        type: "",
        priority: "",
    })

    const [value, onChange] = useState(['00:00', '12:00']);

    const navigate = useNavigate();

    const URL = "http://localhost:4000/";

    const handleChange = (event) => {
        setForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }


    // handleClick
    const handleClick = (event) => {
        createEvent(form)
        setForm({
            date: "",
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            type: "",
            priority: "",
        })
    }

    const createEvent = async (newEvent) => {
        newEvent.dateString = newEvent.date;
        newEvent.startTime = value[0];
        newEvent.endTime = value[1];
        console.log(newEvent)
        await fetch(URL + "event", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(newEvent),
        })

        navigate("/")

    }

    const getParticularEvent = async (id) => {
        const data = await fetch((URL + "event/" + id)).then(res => res.json());
        setForm({
            date: format(parseISO(data.date), "MM-dd-yyyy"),
            title: data.title,
            description: data.description,
            startTime: data.startTime,
            endTime: data.endTime,
            type: data.type,
            priority: data.priority,
        })
        onChange([data.startTime, data.endTime])
    }

    useEffect(() => {
        if ((props.src) === "edit") {


            getParticularEvent(id);

        }
    }, [])


    const updateEvent = async (newEvent) => {
        newEvent.dateString = newEvent.date;
        newEvent.startTime = value[0];
        newEvent.endTime = value[1];
        console.log(newEvent)
        await fetch(URL + "event/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(newEvent),
        })

        navigate("/")

    }

    // handleClick
    const handleUpdateClick = (event) => {
        updateEvent(form)
        setForm({
            date: "",
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            type: "",
            priority: "",
        })
    }


    const handleDeleteClick = (event) => {
        deleteEvent(form)
        setForm({
            date: "",
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            type: "",
            priority: "",
        })
    }

    const deleteEvent = async () => {
        await fetch(URL + "event/" + id, {
            method: "DELETE",
        })

        navigate("/")

    }



    return (
        <div className="create-event">
            <div className="form-title">
                <h1>Create Event</h1>
            </div>

            < Form >
                <Form.Group className="mb-3">
                    <Form.Label className="form-sub-title">Date</Form.Label>
                    <Form.Control name="date" type="text" placeholder="Date" value={form.date}
                        onChange={handleChange} disabled={true} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="form-sub-title">Title</Form.Label>
                    <Form.Control name="title" onChange={handleChange} type="text" placeholder="Title" value={form.title} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="form-sub-title" >Description</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Description" value={form.description}
                        onChange={handleChange} />
                </Form.Group>




                <Form.Group className="mb-3">
                    <Form.Label className="form-sub-title">Type</Form.Label>
                    <Form.Select name="type" value={form.type}
                        onChange={handleChange} >
                        <option>Select</option>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                    </Form.Select>

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="form-sub-title">Priority</Form.Label>
                    <Form.Select name="priority" value={form.priority}
                        onChange={handleChange}>
                        <option>Select</option>
                        <option value="low">Low</option>
                        <option value="high">High</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="form-sub-title">Time Slot</Form.Label><br />
                    <TimeRangePicker onChange={onChange} value={value}
                        format="hh:mm a" disableClock={true} />
                </Form.Group>

            </Form >
            <div className="form-submit">
                {props.src === "create" &&
                    <Button variant="primary" type="button"
                        onClick={handleClick}>
                        Add
                    </Button>}
                {props.src === "edit" &&
                    <Button variant="primary" type="button"
                        onClick={handleUpdateClick}>
                        Update
                    </Button>}

                {props.src === "edit" &&
                    <Button variant="primary" type="button"
                        onClick={handleDeleteClick}
                        style={{ marginLeft: "5px", width: "75px" }}
                    >
                        Delete
                    </Button>}
                <Button variant="primary" type="button"
                    onClick={() => { navigate("/") }}
                    style={{ marginLeft: "5px", width: "75px" }}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default CalendarEventForm;