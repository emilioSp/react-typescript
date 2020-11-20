import React, {useEffect, useState} from 'react';

const DataComponent = <P extends {}>(ComposedComponent: {(props: P): Exclude<React.ReactNode, undefined>}, url: string): any =>
  function DataComponent(props: P) {
    const [state, setState] = useState({
      data: [],
      loaded: false,
      timeoutId: null
    });

    useEffect(() => {
      const updateData = async () => {
        setState(prevState => ({...prevState, loaded: false }));
        try {
          const response = await fetch(url);
          const data = await response.json();
          setState(prevState => ({ ...prevState,
            loaded: true,
            data
          }));
        } catch (e) {
          console.error(e.message);
        }
        const id = setTimeout(updateData, 4000);
        return id;
      }
      updateData();
    }, []);

    return <div>
      {state.loaded ?
        // ? <ComposedComponent data={state.data} {...props} />
        ComposedComponent({...props, data: state.data})
        : <div>Loading</div>}
    </div>;
  }


type Person = {
  name: {
    first: string,
    last: string
  }
}

interface IProps {
  data: {
    results: Array<Person>
  }
}
const PeopleList = ({data}: IProps) =>
  <ol>
    {data.results.map((person, i) => {
      const {first, last} = person.name
      return (
        <li key={i}>{first} {last}</li>
      )
    })}
  </ol>

export const RandomMeUsersHOC = DataComponent(
  PeopleList,
  "https://randomuser.me/api?results=10"
)