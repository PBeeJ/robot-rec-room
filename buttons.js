export default [
  // {
  //   name: 'Info',
  //   set: [
  //     {
  //       label: 'Get info',
  //       command: 'get_info',
  //       description: 'send this to recieve information about the robot',
  //       variant: 'info',
  //     },
  //   ],
  // },
  {
    name: 'Controls',
    set: [
      {
        label: 'left',
        command: 'left',
        description: 'turns the robot left',
        cancelCommand: 'TS',
      },
      {
        label: 'right',
        command: 'right',
        description: 'turns the robot right',
        cancelCommand: 'TS',
      },
      {
        label: 'Stop turning',
        command: 'TS',
        description: 'this stops the robot from turning',
        variant: 'stop',
      },

      {
        label: 'forward',
        command: 'forward',
        description: 'robot goes forward',
        cancelCommand: 'DS',
      },
      {
        label: 'backward',
        command: 'backward',
        description: 'robot goes backward',
        cancelCommand: 'DS',
      },
      {
        label: 'Stop moving',
        command: 'DS',
        description: 'this stops the robot from moving',
        variant: 'stop',
      },
      {
        label: 'Movement speed',
        command: 'wsB',
        description:
          'this sets the move speed to N% - Anything under 25% does not seem to produce enough power to move anything',
        type: 'range',
        min: 0,
        max: 100,
      },
    ],
  },
  {
    name: 'Claw',
    set: [
      {
        label: 'grab',
        command: 'grab',
        description: 'grabs the claw',
        cancelCommand: 'stop',
      },
      {
        label: 'loose',
        command: 'loose',
        description: 'loosens the claw',
        cancelCommand: 'stop',
      },
      {
        label: 'lookleft',
        command: 'lookleft',
        description: 'turns the claw counter-clockwise',
        cancelCommand: 'LRstop',
      },
      {
        label: 'lookright',
        command: 'lookright',
        description: 'turns the claw clockwise',
        cancelCommand: 'LRstop',
      },
    ],
    stopControls: [
      {
        label: 'Stop claw gripping',
        command: 'stop',
        description: 'stops the claw gripping',
      },
      {
        label: 'Stop claw turning',
        command: 'LRstop',
        description: 'stops the claw turning',
      },
    ],
  },
  // {
  //   name: 'Camera',
  //   set: [
  //     {
  //       label: 'up',
  //       command: 'up',
  //       description: 'tilts the camera up',
  //       cancelCommand: 'UDstop',
  //     },
  //     {
  //       label: 'down',
  //       command: 'down',
  //       description: 'tilts the camera down',
  //       cancelCommand: 'UDstop',
  //     },
  //   ],
  //   stopControls: [
  //     {
  //       label: 'Stop camera tilting',
  //       command: 'UDstop',
  //       description: 'stops the camera from tilting',
  //     },
  //   ],
  // },
  // {
  //   name: 'Arm',
  //   set: [
  //     {
  //       label: 'armup',
  //       command: 'armup',
  //       description: 'moves the arm up',
  //       cancelCommand: 'Armstop',
  //     },
  //     {
  //       label: 'armdown',
  //       command: 'armdown',
  //       description: 'moves the arm down',
  //       cancelCommand: 'Armstop',
  //     },
  //   ],
  //   stopControls: [
  //     {
  //       label: 'Stop arm moving',
  //       command: 'Armstop',
  //       description: 'stops the arm from moving',
  //     },
  //   ],
  // },
  // {
  //   name: 'Hand',
  //   set: [
  //     {
  //       label: 'handup',
  //       command: 'handup',
  //       description: 'moves the hand up',
  //       cancelCommand: 'HAstop',
  //     },
  //     {
  //       label: 'handdown',
  //       command: 'handdown',
  //       description: 'moves the hand down',
  //       cancelCommand: 'HAstop',
  //     },
  //   ],
  //   stopControls: [
  //     {
  //       label: 'Stop hand moving',
  //       command: 'HAstop',
  //       description: 'stops the hand from moving',
  //     },
  //   ],
  // },
  // {
  //   name: 'Other',
  //   disabled: true,
  //   set: [
  //     {
  //       label: 'CVFLL1 N',
  //       command: 'CVFLL1 N',
  //       description: 'where N is a number between 0 and 480',
  //     },
  //     {
  //       label: 'CVFLL2 N',
  //       command: 'CVFLL2 N',
  //       description: 'where N is a number between 0 and 480',
  //     },
  //     {
  //       label: 'CVFLSP N',
  //       command: 'CVFLSP N',
  //       description: 'where N is a number between 0 and 480',
  //     },
  //     {
  //       label: 'CVFLColorSet N',
  //       command: 'CVFLColorSet N',
  //       description: 'where N is a number between 0 and 255',
  //     },
  //     {
  //       label: 'CVFL',
  //       command: 'CVFL',
  //       description: 'starts whatever this is',
  //     },
  //     {
  //       label: 'findColorSet',
  //       command: { title: 'findColorSet', data: [150, 255, 255] },
  //       description: 'send this object to set the color of this feature',
  //     },
  //     {
  //       label: 'findColor',
  //       command: 'findColor',
  //       description: 'this starts the find color feature?',
  //     },
  //     {
  //       label: 'motionGet',
  //       command: 'motionGet',
  //       description: 'starts the motion get feature?',
  //     },
  //   ],
  //   stopControls: [
  //     {
  //       label: 'stopCV',
  //       command: 'stopCV',
  //       description: 'this stops the colorSet, findcolor and motionGet features',
  //     },
  //   ],
  // },
  // {
  //   name: 'Routines',
  //   disabled: true,
  //   set: [
  //     {
  //       label: 'automatic',
  //       command: 'automatic',
  //       description: 'starts the automatic feature - be warned, this will send the robot off into a mad dash',
  //       cancelCommand: 'automaticOff',
  //     },
  //     {
  //       label: 'police',
  //       command: 'police',
  //       description: 'starts the police lights flashing feature',
  //       cancelCommand: 'policeOff',
  //     },
  //     {
  //       label: 'trackLine',
  //       command: 'trackLine',
  //       description: 'starts the line tracking feature - be warned, this will send the robot off into a mad dash',
  //       cancelCommand: 'politrackLineOffceOff',
  //     },
  //   ],
  //   stopControls: [
  //     {
  //       label: 'automaticOff',
  //       command: 'automaticOff',
  //       description: 'stops the automatic feature',
  //     },
  //     {
  //       label: 'policeOff',
  //       command: 'policeOff',
  //       description: 'stops the police lights flashing feature',
  //     },
  //     {
  //       label: 'trackLineOff',
  //       command: 'trackLineOff',
  //       description: 'stops the line tracking feature',
  //     },
  //   ],
  // },
];
