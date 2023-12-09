
// import React, { Component } from 'react';
// import './BookingForm.css';
// import { useHistory } from 'react-router-dom';
// import Receipt from './Receipt'; // Import the Receipt component

// class BookingForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       date: '',
//       startTime: '',
//       endTime: '',
//       numSeats: 1,
//       selectedSeats: [],
//       availableSeats: [], // Initialize availableSeats as an empty array
//       isBookingSuccessful: false,
//     };
//   }

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSeatSelection = (seat) => {
//     const { selectedSeats } = this.state;
//     const newSelectedSeats = selectedSeats.includes(seat)
//       ? selectedSeats.filter((s) => s !== seat)
//       : [...selectedSeats, seat];

//     this.setState({ selectedSeats: newSelectedSeats });
//   };

//   validateForm = () => {
//     const { date, startTime, endTime, numSeats, selectedSeats } = this.state;
//     if (startTime >= endTime) {
//       alert('Start time must be earlier than end time');
//       return false;
//     }
//     if (numSeats < 1 || numSeats > 10) {
//       alert('Number of seats must be between 1 and 10');
//       return false;
//     }
//     if (selectedSeats.length === 0) {
//       alert('Please select at least one seat');
//       return false;
//     }
//     return true;
//   };

//   handleSubmit = (e) => {
//         e.preventDefault();
//         if (!this.validateForm()) {
//           return;
//         }
    
//         const { date,startTime, endTime, numSeats, selectedSeats } = this.state;
    
//         fetch('http://localhost:5000/api/bookings', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({date, startTime, endTime, numSeats, selectedSeats }),
//         })
//           .then((response) => {
//             if (response.status === 201) {
//               console.log('Booking successful');
//               // Reset the form and clear selected seats
//               this.setState({
//                 date: '',
//                 startTime: '',
//                 endTime: '',
//                 numSeats: 1,
//                 selectedSeats: [],
//               });
//               alert('Booking successful!');
//             } else {
//               console.error('Booking failed');
//               alert('Booking failed');
//             }
//           })
//       //     history.push({
//       //       pathname: '/receipt',
//       //       state: {
//       //         username,
//       //         date,
//       //         startTime,
//       //         endTime,
//       //         numSeats,
//       //         selectedSeats,
//       //       },
//       //     });
//       //   } else {
//       //     console.error('Booking failed');
//       //     alert('Booking failed');
//       //   }
//       // })
//           .catch((error) => {
//             console.error(error);
//             alert('Booking failed');
//           });
    
        
//       };

//   checkAvailableSeats = async () => {
//     const { date, startTime, endTime } = this.state;
  
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/available-seats?date=${date}&startTime=${startTime}&endTime=${endTime}`
//       );
  
//       if (response.status === 200) {
//         const availableSeats = await response.json();
//         console.log('Available seats response:', availableSeats);
  
//         // Update the state based on the structure of the availableSeats data
//         this.setState({ availableSeats });
//       } else if (response.status === 404) {
//         // No available seats message
//         this.setState({ availableSeats: [] });
//         console.log('No available seats for the specified time.');
//       } else {
//         // Handle other error cases
//         console.error('Error checking seat availability');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

//   render() {
//     const { username, date, startTime, endTime, numSeats, selectedSeats, isBookingSuccessful } = this.state;

//     return (
//       <div className="booking-form">
//         <h2>Seat Booking Form</h2>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-book">
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={username}
//                 onChange={this.handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="date">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={date}
//                 onChange={this.handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="startTime">Start Time</label>
//               <input
//                 type="time"
//                 name="startTime"
//                 value={startTime}
//                 onChange={this.handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="endTime">End Time</label>
//               <input
//                 type="time"
//                 name="endTime"
//                 value={endTime}
//                 onChange={this.handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="numSeats">Number of Seats</label>
//               <input
//                 type="number"
//                 name="numSeats"
//                 value={numSeats}
//                 onChange={this.handleInputChange}
//                 required
//               />
//             </div>

//             <div className="seat-selection">
//               <label>Seat Selection</label>
//               <div className="seats">
//                 {Array.from({ length: 10 }, (_, index) => {
//                   const seatNumber = index + 1;
//                   return (
//                     <div
//                       key={index}
//                       className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
//                       onClick={() => this.handleSeatSelection(seatNumber)}
//                     >
//                       {seatNumber}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {this.state.availableSeats.length > 0 ? (
//   <div className='div-avlbl'>
//     <p>Available seats:</p>
//     <ul className='avlbl-seats'>
//       {this.state.availableSeats.map((seat, index) => (
//         <p className='avlbl-seat' key={index}>{seat}</p>
//       ))}
//     </ul>
//   </div>
// ) : (
//   <p>No available seats for the specified time.</p>
// )}

//           </div>
//           <button type="submit">Book Seats</button>
//         </form>
//         <button onClick={this.checkAvailableSeats}>Check Availability</button>
//       </div>
//     );
//   }
// }

// export default BookingForm;
import React, { Component } from 'react';
import './BookingForm.css';

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      date: '',
      startTime: '',
      endTime: '',
      numSeats: 1,
      selectedSeats: [],
      availableSeats: [],
      isBookingSuccessful: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSeatSelection = (seat) => {
    const { selectedSeats } = this.state;
    const newSelectedSeats = selectedSeats.includes(seat)
      ? selectedSeats.filter((s) => s !== seat)
      : [...selectedSeats, seat];

    this.setState({ selectedSeats: newSelectedSeats });
  };

  validateForm = () => {
    const { date, startTime, endTime, numSeats, selectedSeats } = this.state;
    if (startTime >= endTime) {
      alert('Start time must be earlier than end time');
      return false;
    }
    if (numSeats < 1 || numSeats > 10) {
      alert('Number of seats must be between 1 and 10');
      return false;
    }
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      return;
    }

    const { username, date, startTime, endTime, numSeats, selectedSeats } = this.state;

    fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, date, startTime, endTime, numSeats, selectedSeats }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('Booking successful');
          // Reset the form and clear selected seats
          this.setState({
            username: '',
            date: '',
            startTime: '',
            endTime: '',
            numSeats: 1,
            selectedSeats: [],
            isBookingSuccessful: true,
          });
        } else {
          console.error('Booking failed');
          alert('Booking failed');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Booking failed');
      });
  };

  checkAvailableSeats = async () => {
    const { date, startTime, endTime } = this.state;

    try {
      const response = await fetch(
        `http://localhost:5000/api/available-seats?date=${date}&startTime=${startTime}&endTime=${endTime}`
      );

      if (response.status === 200) {
        const availableSeats = await response.json();
        console.log('Available seats response:', availableSeats);
        this.setState({ availableSeats });
      } else if (response.status === 404) {
        this.setState({ availableSeats: [] });
        console.log('No available seats for the specified time.');
      } else {
        console.error('Error checking seat availability');
      }
    } catch (error) {
      console.error(error);
    }
  };

  renderConfirmationMessage = () => {
    return (
      <div className="confirmation-message">
        <h2>Booking Successful!</h2>
        <p>Thank you for booking. Your seats are reserved.</p>
      </div>
    );
  };

  renderReceipt = () => {
    const { username, date, startTime, endTime, numSeats, selectedSeats } = this.state;

    return (
      <div className="receipt">
        <h2>Booking Receipt</h2>
        <p>Username: {username}</p>
        <p>Date: {date}</p>
        <p>Start Time: {startTime}</p>
        <p>End Time: {endTime}</p>
        <p>Number of Seats: {numSeats}</p>
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
      </div>
    );
  };

  render() {
    const { isBookingSuccessful } = this.state;

    return (
      <div className="booking-form">
        <h2>Seat Booking Form</h2>
        {isBookingSuccessful ? (
          <div>
            {this.renderConfirmationMessage()}
            {this.renderReceipt()}
          </div>
        ) : (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-book">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="startTime">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={this.state.startTime}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endTime">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={this.state.endTime}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numSeats">Number of Seats</label>
                  <input
                    type="number"
                    name="numSeats"
                    value={this.state.numSeats}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className="seat-selection">
                  <label>Seat Selection</label>
                  <div className="seats">
                    {Array.from({ length: 10 }, (_, index) => {
                      const seatNumber = index + 1;
                      return (
                        <div
                          key={index}
                          className={`seat ${this.state.selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
                          onClick={() => this.handleSeatSelection(seatNumber)}
                        >
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button type="submit">Book Seats</button>
            </form>
            <button onClick={this.checkAvailableSeats}>Check Availability</button>
            {this.state.availableSeats.length > 0 && (
              <div className="div-avlbl">
                <p>Available seats:</p>
                <ul className="avlbl-seats">
                  {this.state.availableSeats.map((seat, index) => (
                    <p className="avlbl-seat" key={index}>
                      {seat}
                    </p>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default BookingForm;
