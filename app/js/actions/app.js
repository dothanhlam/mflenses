export const TEST_ACTION = 'TEST_ACTION';
export const TEST_ASYNC_ACTION = 'TEST_ASYNC_ACTION';

export const TEST_ASYNC_ACTION_START = 'TEST_ASYNC_ACTION_START';
export const TEST_ASYNC_ACTION_ERROR = 'TEST_ASYNC_ACTION_ERROR';
export const TEST_ASYNC_ACTION_SUCCESS = 'TEST_ASYNC_ACTION_SUCCESS';

// Test action

export function testAction() {
  return {
    type: TEST_ACTION,
  };
}

// Async action example

function testAsyncStart() {
  return {
    type: TEST_ASYNC_ACTION_START,
  };
}

export function testAsync() {
    return {
        type: TEST_ASYNC_ACTION,
    };
}
