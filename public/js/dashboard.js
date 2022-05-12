    var data_val_1 = 0;
    var data_val_2 = 0;
    var data_val_3 = 0;
    var data_val_4 = 0;
    var fuel_level = 0;
    var battery_level = 0;
    var carriage_position = 0;
    var rotary_rpm = 0;

    $("#speedometer-1").speedometer({
        divFact:500,
        eventListenerType:'keyup',
        maxVal:9000,
        dangerLevel:6500,
        edgeRadius:150,
        speedoNobeW:95,
        indicatorRadius:125,
        indicatorNumbRadius:90,
        speedPositionTxtWH:80,
        numbW:40,
        numbH:16,
        noOfSmallDiv:2,
        gagueLabel:'psi',
        title:'Rotary'
    });
    $("#speedometer-2").speedometer({
        divFact:500,
        eventListenerType:'keyup',
        maxVal:9000,
        dangerLevel:6500,
        edgeRadius:150,
        speedoNobeW:95,
        indicatorRadius:125,
        indicatorNumbRadius:90,
        speedPositionTxtWH:80,
        numbW:40,
        numbH:16,
        noOfSmallDiv:2,
        gagueLabel:'psi',
        title:'Carriage'
    });
    $("#speedometer-3").speedometer({
        divFact:150,
        eventListenerType:'keyup',
        maxVal:3000,
        dangerLevel:2000,
        edgeRadius:150,
        speedoNobeW:95,
        indicatorRadius:125,
        indicatorNumbRadius:90,
        speedPositionTxtWH:80,
        numbW:40,
        numbH:16,
        noOfSmallDiv:2,
        gagueLabel:'psi',
        title:'Mud'
    });
    $("#speedometer-4").speedometer({
        divFact:500,
        eventListenerType:'keyup',
        maxVal:9000,
        dangerLevel:6500,
        edgeRadius:150,
        speedoNobeW:95,
        indicatorRadius:125,
        indicatorNumbRadius:90,
        speedPositionTxtWH:80,
        numbW:40,
        numbH:16,
        noOfSmallDiv:2,
        gagueLabel:'psi',
        title:'Vice'
    });

    $("#carriage-postion-level").sevenSegArray({ digits: 4, value: 12.35 });