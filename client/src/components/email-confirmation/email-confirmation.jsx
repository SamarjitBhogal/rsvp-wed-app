import React from 'react';

const EmailConfirmation = ({ eventName, firstName, lastName }) => {
	const LadiesParty = () => {
		return (
			<div>
				<p>
					<strong>Date:</strong> Thursday, July 31st, 2025
				</p>
				<p>
					<strong>Time:</strong> 6:30 PM
				</p>
				<p>
					<strong>Location:</strong> Fraserview Banquet Hall - 8240 Fraser St, Vancouver, BC V5X 3X6
				</p>
			</div>
		);
	};

	const WeddingCeremony = () => {
		return (
			<div>
				<p>
					<strong>Date:</strong> Saturday, August 2nd, 2025
				</p>
				<p>
					<strong>Times:</strong>
					<p>Reception of Barat - 9:00 AM</p>
					<p>Anand Karaj - 11:00 AM</p>
					<p>Lunch - 12:30 PM</p>
				</p>
				<p>
					<strong>Location:</strong> York Gurdwara Sahib Society - 7938 128 St, Surrey, BC V3W 3B1
				</p>
			</div>
		);
	};

	return (
		<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#333' }}>
			<div style={{ backgroundColor: '#f4f4f4', padding: '20px' }}>
				<h2 style={{ color: '#2c3e50' }}>RSVP Confirmation for {eventName}</h2>
				<p>
					Dear {firstName ? firstName : 'Guest'}
					{lastName ? ` ${lastName}` : ''},
				</p>
				<p>We're excited that you'll be attending the event!</p>
				<div>
					<h3>Event Details:</h3>
					{eventName === 'Ladies Party' ? <LadiesParty /> : <WeddingCeremony />}
				</div>
				<p>If you need any further details or assistance, please don’t hesitate to reach out to us!</p>
				<p>We look forward to seeing you!</p>
				<p>Best regards,</p>
				<p>
					<strong>The Bhogal Family</strong>
					<p>P: (604)-729-5411</p>
				</p>
			</div>
		</div>
	);
};

export default EmailConfirmation;
