import { useEffect, useState } from 'react';

const useFetchPeople = () => {
  const [state, setState] = useState({
    people: [],
    loaded: false
  });

  useEffect(() => {
    const updatePeople = async () => {
      setState({ loaded: false, people: [] });
      try {
        const response = await fetch('https://randomuser.me/api?results=10');
        const responseJson = await response.json();
        setState({
          loaded: true,
          people: responseJson.results
        });
      } catch (e) {
        console.error(e.message);
      }
      setTimeout(updatePeople, 4000);
    }
    updatePeople();
  }, []);

  return state;
}

interface Props {
  people: Array<{
    name: {
      first: string,
      last: string
    }
  }>
}

// extends to pass other props
const PeopleList = <P extends Props>(props: P) =>
  <ol>
    {props.people.map((person, i) => {
      const {first, last} = person.name
      return (
        <li key={i}>{first} {last}</li>
      )
    })}
  </ol>

export const RandomMeUsersHooks = () => {
  const { people, loaded } = useFetchPeople();
  if (!loaded) return <div>Loading...</div>

  return <PeopleList people={people} test={1}/>
}