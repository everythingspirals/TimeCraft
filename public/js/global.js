function diff(start,stop){
	stop = moment(stop);
        start = moment(start);
        if (stop < start){
            stop = stop.add('days',1);
        }
    return (stop.diff(start,'minutes')/60).toFixed(2);
}