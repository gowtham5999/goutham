import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("create");
  const [cards, setCards] = useState([1, 2, 3]);
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    id: "",
    gender: "",
    number: "",
    aadhar: "",
    date: "",
    validity: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCard = () => {
    setPage("create");
    setCards([...cards, Date.now()]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecords([...records, form]);
    setShowModal(false);
    setPage("records");
    setForm({
      name: "",
      age: "",
      id: "",
      gender: "",
      number: "",
      aadhar: "",
      date: "",
      validity: ""
    });
  };

  const deleteRecord = (i) => {
    setRecords(records.filter((_, idx) => idx !== i));
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <button onClick={addCard}>Create Table</button>
        <button onClick={() => setPage("records")}>Records</button>
        <button onClick={() => setPage("whatsapp")}>Send WhatsApp</button>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* CREATE PAGE */}
        {page === "create" && (
          <div className="grid">
            {cards.map((id) => (
              <div
                key={id}
                className="card"
                onClick={() => setShowModal(true)}
              >
                <span>+ Create Table</span>
                <div
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCards(cards.filter(c => c !== id));
                  }}
                >
                  ✕
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RECORDS PAGE */}
        {page === "records" && (
          <>
            <h3>All Records</h3>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>ID</th>
                  <th>Gender</th>
                  <th>Number</th>
                  <th>Aadhar</th>
                  <th>Date</th>
                  <th>Validity</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {records.length === 0 && (
                  <tr>
                    <td colSpan="9">No Records Found</td>
                  </tr>
                )}

                {records.map((r, i) => (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td>{r.age}</td>
                    <td>{r.id}</td>
                    <td>{r.gender}</td>
                    <td>{r.number}</td>
                    <td>{r.aadhar}</td>
                    <td>{r.date}</td>
                    <td>{r.validity}</td>
                    <td>
                      <button
                        className="action-btn del"
                        onClick={() => deleteRecord(i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="back-btn" onClick={() => setPage("create")}>
              Back
            </button>
          </>
        )}

        {/* WHATSAPP PAGE */}
        {page === "whatsapp" && (
          <div className="whatsapp-wrapper">
            <div className="whatsapp-box">
              <h3>Send WhatsApp Message</h3>

              <div className="wa-field">
                <label>To Number</label>
                <input placeholder="Enter WhatsApp Number" />
              </div>

              <div className="wa-field">
                <label>Message</label>
                <textarea placeholder="Enter greeting message"></textarea>
              </div>

              <div className="wa-row">
                <div className="wa-field">
                  <label>Time</label>
                  <input type="time" />
                </div>
                <div className="wa-field">
                  <label>Date</label>
                  <input type="date" />
                </div>
              </div>

              <div className="wa-actions">
                <button className="send-btn">Schedule</button>
                <button className="back-btn" onClick={() => setPage("records")}>
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Create Record</h3>

            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Name" onChange={handleChange} required />
              <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
              <input name="id" placeholder="ID" onChange={handleChange} required />

              <select name="gender" onChange={handleChange} required>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <input name="number" placeholder="Mobile Number" onChange={handleChange} required />
              <input name="aadhar" placeholder="Aadhar Number" onChange={handleChange} required />

              <select name="validity" onChange={handleChange} required>
                <option value="">Validity</option>
                <option>1month</option>
                <option>3month</option>
                <option>6month</option>
                <option>1year</option>
                <option>2year</option>
                <option>3year</option>
              </select>

              <input type="date" name="date" onChange={handleChange} required />

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
