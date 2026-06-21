"use client";

import { useState } from "react";

export default function PlanEventPage() {
  const [step, setStep] = useState(1);

  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const whatsappMessage = encodeURIComponent(`
Hello Anivast Flowers, Events & Decor.

Event Type: ${eventType}
Date: ${eventDate}
Venue: ${venue}
Guests: ${guests}
Budget: ${budget}

Notes:
${notes}

Please send me a quotation.

Thank you.
`);

  return (
    <main
      style={{
        background: "#f7f3ee",
        minHeight: "100vh",
        padding: "2rem 1rem 6rem",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "30px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#4a3128",
            marginBottom: "2rem",
            fontSize: "clamp(2rem,4vw,3rem)",
          }}
        >
          Plan Your Event
        </h1>

        {/* Progress */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background:
                  step >= item ? "#b22222" : "#e6ddd6",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* STEP 1 */}

        {step === 1 && (
          <>
            <h2
              style={{
                color: "#4a3128",
                marginBottom: "1.5rem",
              }}
            >
              What type of event are you planning?
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(150px,1fr))",
                gap: "1rem",
              }}
            >
              {[
                "Wedding",
                "Birthday",
                "Baby Shower",
                "Corporate",
                "Funeral",
                "Other",
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setEventType(type)}
                  style={{
                    padding: "1rem",
                    borderRadius: "16px",
                    border:
                      eventType === type
                        ? "2px solid #b22222"
                        : "1px solid #ddd",
                    background:
                      eventType === type
                        ? "#fff4f4"
                        : "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <>
            <h2
              style={{
                color: "#4a3128",
                marginBottom: "1.5rem",
              }}
            >
              Event Details
            </h2>

            <div
              style={{
                display: "grid",
                gap: "1rem",
              }}
            >
              <input
                type="date"
                value={eventDate}
                onChange={(e) =>
                  setEventDate(e.target.value)
                }
                style={inputStyle}
              />

              <input
                placeholder="Venue / Location"
                value={venue}
                onChange={(e) =>
                  setVenue(e.target.value)
                }
                style={inputStyle}
              />

              <input
                placeholder="Number of Guests"
                value={guests}
                onChange={(e) =>
                  setGuests(e.target.value)
                }
                style={inputStyle}
              />

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                style={inputStyle}
              >
                <option value="">
                  Select Budget Range
                </option>

                <option>
                  Under KES 50,000
                </option>

                <option>
                  KES 50,000 - 100,000
                </option>

                <option>
                  KES 100,000 - 250,000
                </option>

                <option>
                  KES 250,000+
                </option>
              </select>
            </div>
          </>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <>
            <h2
              style={{
                color: "#4a3128",
                marginBottom: "1.5rem",
              }}
            >
              Inspiration & Notes
            </h2>

            <textarea
              rows={8}
              placeholder="Tell us about your dream event..."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </>
        )}

        {/* STEP 4 */}

        {step === 4 && (
          <>
            <h2
              style={{
                color: "#4a3128",
                marginBottom: "1.5rem",
              }}
            >
              WhatsApp Preview
            </h2>

            <div
              style={{
                background: "#f7f3ee",
                borderRadius: "20px",
                padding: "1.5rem",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              <strong>Event Type:</strong> {eventType}
              <br />
              <strong>Date:</strong> {eventDate}
              <br />
              <strong>Venue:</strong> {venue}
              <br />
              <strong>Guests:</strong> {guests}
              <br />
              <strong>Budget:</strong> {budget}
              <br />
              <br />
              <strong>Notes:</strong>
              <br />
              {notes}
            </div>

            <a
              href={`https://wa.me/254700000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                background: "#25D366",
                color: "#fff",
                padding: "16px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Send on WhatsApp
            </a>
          </>
        )}

        {/* Navigation */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          {step > 1 ? (
            <button
              onClick={previousStep}
              style={secondaryButton}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 && (
            <button
              onClick={nextStep}
              style={primaryButton}
            >
              Next Step →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};

const primaryButton = {
  background: "#b22222",
  color: "#fff",
  border: "none",
  padding: "14px 24px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 700,
};

const secondaryButton = {
  background: "#4a3128",
  color: "#fff",
  border: "none",
  padding: "14px 24px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: 700,
};