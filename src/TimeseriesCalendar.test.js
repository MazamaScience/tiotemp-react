import { render, screen } from '@testing-library/react';
import TimeseriesCalendar from './TimeseriesCalendar';

test('renders learn react link', () => {
  render(<TimeseriesCalendar data={[["2020-01-01 00:01", 0]]} />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
