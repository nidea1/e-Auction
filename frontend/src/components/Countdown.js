import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";

import { calculateCountdown } from "../calculateCountdown";

function Countdown({ endDate, onCountdownUpdate }) {
  const [countdown, setCountdown] = useState(calculateCountdown(endDate));

  useEffect(() => {
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

  function renderTimeUnit(value, unit) {
    return value > 0 ? `${value} ${unit}` : "";
  }

  return (
    <>
      {countdown.days > 0 && (
        <Col>
        {renderTimeUnit(countdown.days, "d")},
        </Col>
      )}
      {countdown.hours > 0 && (
        <Col>
        {renderTimeUnit(countdown.hours, "h")},
        </Col>
      )}
      {countdown.minutes > 0 && (
        <Col>
        {renderTimeUnit(countdown.minutes, "m")},
        </Col>
      )}
      {countdown.seconds > 0 && (
        <Col>
        {renderTimeUnit(countdown.seconds, "s")}
        </Col>
      )}
      {countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 && (
        <Col>
        The auction is closed.
        </Col>
      )}
    </>
  );
}

export default Countdown;