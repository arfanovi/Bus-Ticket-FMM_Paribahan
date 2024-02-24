

const seats = document.querySelectorAll('.seat');
const totalPrice = document.getElementById('totalPrice');
const grandTotalPrice = document.getElementById('grandTotalPrice');
const seatsLeft = document.getElementById('seatsLeft');
const seatsBooked = document.getElementById('seatsBooked');
const nextButton = document.getElementById('nextButton');
const couponInput = document.getElementById('couponInput');
const applyCouponButton = document.getElementById('applyCouponButton');
const seatDetails = document.querySelector('#seatDetails tbody');

let bookedSeatsCount = 0;
let grandTotal = 0;


function ticketUpdate(){
    totalPrice.textContent = (550 * bookedSeatsCount).toFixed(2);
    seatsLeft.textContent = 20 - bookedSeatsCount;
    seatsBooked.textContent = bookedSeatsCount;
    grandTotalPrice.textContent = grandTotal.toFixed(2);
    nextButton.disabled = bookedSeatsCount !== 4;
}

function handleSeatClick(event){
    const seat = event.target;
    if(!seat.classList.contains('booked') && bookedSeatsCount < 4){
        seat.classList.add('booked');
        bookedSeatsCount++;
        grandTotal += 550;
        const row = document.createElement('tr');
        row.innerHTML = ` <td> ${seat.textContent} </td> <td> Economy </td> <td> 550.00<.td>`;
        seatDetails.appendChild(row);

    }
    else if (seat.classList.contains('booked')){
        seat.classList.remove('booked');
        bookedSeatsCount--;
        grandTotal -= 550;
        seatDetails.removeChild(seatDetails.lastElementChild);
    }
    ticketUpdate();
}


function couponDiscount(){
    const couponCode = couponInput.value.trim();
    if(couponCode === 'NEW15' && bookedSeatsCount === 4){
        totalPrice.textContent = (parseFloat(totalPrice.textContent) - 100).toFixed(2);
        grandTotal -= 500;
        grandTotalPrice.textContent = grandTotal.toFixed(2);
        alert('Coupon applied successfully')
    }
    else {
        alert('COupon Invaliud')
    }
}
seats.forEach(seat => {
    seat.addEventListener('click', handleSeatClick)
});
applyCouponButton.addEventListener('click', couponDiscount)



