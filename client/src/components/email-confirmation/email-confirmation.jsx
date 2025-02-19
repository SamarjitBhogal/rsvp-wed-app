import React from 'react';

const EmailConfirmation = ({ eventName, firstName }) => {
	return (
		<div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#333' }}>
			<div style={{ backgroundColor: '#f4f4f4', padding: '20px' }}>
				<h2 style={{ color: '#2c3e50' }}>RSVP Confirmation for {eventName}</h2>
				<p>Dear {firstName ? firstName : 'Guest'},</p>
				<p>We're excited that you'll be attending the event!</p>
				<div>
					<h3>Event Details:</h3>
					<p>
						<strong>Date:</strong> March 15, 2025
					</p>
					{/* static info */}
					<p>
						<strong>Time:</strong> 6:00 PM
					</p>
					{/* static info */}
					<p>
						<strong>Location:</strong> 123 Event Avenue, City, State
					</p>
					{/* static info */}
				</div>
				<p>If you need any further details or assistance, please don’t hesitate to reach out to us!</p>
				<p>We look forward to seeing you!</p>
				<p>Best regards,</p>
				<p>
					<strong>The Bhogal Family</strong>
                    <p>***Insert contact info***</p>
				</p>
			</div>
		</div>
	);
};

export default EmailConfirmation;
