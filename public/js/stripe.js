/* exlint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_51L0mZLLx85meDSdT5LieEotdUlaNd2sZf0PmLKv5Wpp222m4K6DacmeTli0aridI9vb0uDIOuc46eLH7cmQ6GTKU00qnsnOWIV');
export const bookTour = async tourId => {
    try{
    // 1. Get checkout session from API
    const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);
    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id
    })
    } catch(err) {
        console.log(err);
        showAlert('error', err);
    }
}