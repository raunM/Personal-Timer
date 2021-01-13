import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Timer from "react-compound-timer";
import { createTimeLog } from "../services/TimeLogAPI";
import { Container, Button, Form } from "reactstrap";

type TimeLogData = {
  duration: number;
  category: string;
  description: string;
};

type TimerActions = {
  start: any;
  stop: any;
  getTime: any;
  timerState: any;
};

function PersonalTimer() {
  const { register, handleSubmit, formState: { dirtyFields } } = useForm();
  const [finalTime, setFinalTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef: any = useRef(null);
  // make limit for timer 10 hours
  const timeLimit = 36000000;
  const history = useHistory();

  const canSubmit = !timerRunning && 
    finalTime !== 0 && 
    !!dirtyFields.category && 
    !!dirtyFields.description;

  function startTimer(start: () => void): void {
    start();
    setTimerRunning(true);
  }

  function timerLimitReached() {
    timerRef.current.stop();
    setTimerRunning(false);
    setFinalTime(Math.floor(timerRef.current.getTime() / 1000));
	}

  function stopTimer(stop: () => void, timeInSeconds: number): void {
    stop();
    setTimerRunning(false);
    setFinalTime(Math.floor(timeInSeconds / 1000));
  }

  async function onSubmit(timeLogData: TimeLogData) {
    timeLogData.duration = finalTime;
    await createTimeLog(timeLogData);
    history.push("/time-logs");
  }

	return (
    <Container className="centered-component-content w-25">
      <div className="d-flex flex-column flex-grow-1 text-center">
        <h1>New Time Log</h1>

        <Timer
          ref={timerRef}
          initialTime={0}
          startImmediately={false}
          checkpoints={[
            {
              time: timeLimit,
              callback: () => timerLimitReached()
            }
          ]}
        >
          {(timerActions: TimerActions) => (
            <>
              <div>
                <span className="mr-3">
                  <Timer.Hours /> hours
                </span>

                <span className="mr-3">
                  <Timer.Minutes /> minutes
                </span>

                <Timer.Seconds /> seconds
              </div>

              <div className="mt-3">
                <Button onClick={() => startTimer(timerActions.start)} color="success" style={{ marginRight: "15px" }}>Start</Button>
                <Button onClick={() => stopTimer(timerActions.stop, timerActions.getTime())} color="danger" style={{ marginRight: "15px" }}>Stop</Button>
              </div>
            </>
          )}
        </Timer>

        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input 
              type="text" 
              name="category" 
              placeholder="Health & Fitness" 
              maxLength={50}
              ref={register} 
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              name="description" 
              placeholder="Pushups to failure." 
              rows={3} 
              maxLength={240} 
              ref={register} 
              className="form-control"
            />
          </div>

          <Button type="submit" color="primary" disabled={!canSubmit}>Save</Button>
        </Form>
      </div>
		</Container>
	);
}

export default PersonalTimer;
