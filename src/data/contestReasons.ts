import { ContestReason } from '../types';

export const contestReasons: ContestReason[] = [
  {
    id: 'signs-unclear',
    title: 'Unclear or Missing Signs',
    description: 'The parking restriction signs were missing, obscured, or unclear at the location.',
    successRate: 'High',
    template: 'I received this ticket for parking in a restricted area, but the signage was [obscured/missing/unclear] because [specific reason]. Without clear signage, I had no reasonable way to know about the parking restriction. I have attached photos showing the lack of clear signage at the location.'
  },
  {
    id: 'meter-malfunction',
    title: 'Parking Meter Malfunction',
    description: 'The parking meter was not working properly when you tried to pay.',
    successRate: 'Medium',
    template: 'I attempted to pay for parking, but the meter was malfunctioning. When I tried to [insert specific action], the meter [describe malfunction]. I made a reasonable attempt to pay, but due to the technical issues with the meter, I was unable to. I have included [photos/evidence] of the malfunctioning meter.'
  },
  {
    id: 'emergency-situation',
    title: 'Emergency Situation',
    description: 'You parked temporarily due to a medical or other emergency.',
    successRate: 'Medium-High',
    template: 'I parked at this location due to an emergency situation where [describe emergency]. Given the circumstances, I had no reasonable alternative but to park there temporarily. I have attached [documentation/evidence] supporting the emergency situation that occurred.'
  },
  {
    id: 'incorrect-details',
    title: 'Incorrect Ticket Information',
    description: 'The ticket contains incorrect information about your vehicle or the violation.',
    successRate: 'High',
    template: 'The information on the ticket is incorrect. The ticket states [incorrect information], but the actual facts are [correct information]. This discrepancy demonstrates that the ticket was issued in error. I have included evidence showing the correct information.'
  },
  {
    id: 'vehicle-sold',
    title: 'Vehicle Was Sold',
    description: 'You had sold the vehicle before the ticket was issued.',
    successRate: 'High',
    template: 'I had sold this vehicle before the ticket was issued. The vehicle was sold on [date] to [new owner name if known], and I have attached documentation proving the transfer of ownership. Therefore, I was not the owner of the vehicle at the time the ticket was issued.'
  },
  {
    id: 'permit-displayed',
    title: 'Valid Permit Was Displayed',
    description: 'You had a valid parking permit displayed at the time of the violation.',
    successRate: 'High',
    template: 'I had a valid parking permit displayed in my vehicle at the time this ticket was issued. The permit number is [permit number] and was clearly visible on my [windshield/dashboard/etc.]. I have attached a photo of my valid permit and receipt of purchase as evidence.'
  },
  {
    id: 'broken-down',
    title: 'Vehicle Breakdown',
    description: 'Your vehicle was broken down and could not be moved.',
    successRate: 'Medium',
    template: 'My vehicle broke down at this location due to [specific issue], and I was unable to move it before the ticket was issued. I have attached [receipt from mechanic/towing service/etc.] as evidence of the breakdown and subsequent repair.'
  },
  {
    id: 'custom',
    title: 'Other Reason',
    description: 'Provide your own explanation for why the ticket should be dismissed.',
    successRate: 'Varies',
    template: ''
  }
];