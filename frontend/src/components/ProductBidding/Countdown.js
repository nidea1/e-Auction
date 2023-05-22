import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { format } from "date-fns";

import { calculateCountdown } from "../../calculateCountdown";

function Countdown({ endDate, onCountdownUpdate }) {
  const [countdown, setCountdown] = useState(calculateCountdown(endDate));

  useEffect(() => {
    const initialCountdown = calculateCountdown(endDate);
    if (onCountdownUpdate) {
      onCountdownUpdate(initialCountdown);
    }
  
    const timer = setInterval(() => {
      const newCountdown = calculateCountdown(endDate);
      setCountdown(newCountdown);
      if (onCountdownUpdate) {
        onCountdownUpdate(newCountdown);
      }
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, [endDate, onCountdownUpdate]);

  return (
    <Col className='fw-semibold'>
      {countdown.days > 0 ? (
        `${countdown.days}d ${countdown.hours}h | ${format(endDate, 'EE, HH:mm')}`
      ) : countdown.hours > 0 ? (
        `${countdown.hours}h ${countdown.minutes}m | ${format(endDate, 'EE, HH:mm')}`
      ) : countdown.minutes > 0 ? (
        `${countdown.minutes}m ${countdown.seconds}s | Today ${format(endDate, 'HH:mm')}`
      ) : countdown.seconds <= 0 && (
        `The auction is closed.`
      )}
    </Col>
  );
}

export default Countdown;
