import calendarReducer from "./calendar.reducer";

describe("Testing calendarReducer", () => {
  test("should have its correct initial state", () => {
    let action = {};
    let returnedState = calendarReducer(undefined, action);
    expect(returnedState).toEqual([]);
  });

  test("giving action.type of SET_EVENTS should return a state that is an array of event objects", () => {
    let action = { type: "SET_EVENTS",  payload: [{id: 1, title: 'test 1'}, {id: 2, title: 'test 2'}] };
    let returnedState = calendarReducer(undefined, action);
    expect(returnedState).toEqual([{id: 1, title: 'test 1'}, {id: 2, title: 'test 2'}]);
  });

});
