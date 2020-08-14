import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createDependencyManager } from "./DependencyManager";
import { TimeApi, WorldTime, MockTime } from "./TimeApi";

export interface Dependencies {
  timeProvider: () => TimeApi;
}

const dependencyContainer: Dependencies = {
  timeProvider: () => WorldTime,
};

//Dependecies can be easily switched for testing or if underlining api changes as long as conforms to protocol.
// const testDependencyContainer: Dependecies = {
//   timeProvider: () => MockTime,
// };

const manager = createDependencyManager<Dependencies>();

const useTimeProvider = () => {
  const dependecies = manager.hook();
  return dependecies.timeProvider();
};

export const DedependencyProvider = manager.provider;
function App() {
  return (
    <DedependencyProvider container={dependencyContainer}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <MyComponent />
        </header>
      </div>
    </DedependencyProvider>
  );
}

export const MyComponent: React.FC = () => {
  const timeProvider = useTimeProvider();
  const [time, setTime] = useState<Date | undefined>();
  useEffect(() => {
    timeProvider.getTime().then((timeResponse) => {
      setTime(timeResponse);
    });
  }, []);
  return <span data-testid="time">{time?.toDateString() || "No time..."}</span>;
};

export default App;
