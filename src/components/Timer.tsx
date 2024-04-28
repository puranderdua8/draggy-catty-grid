import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

export const Timer = ({fromSeconds}: {fromSeconds: number}) => {
    const [now, setNow] = useState(+new Date());
    useInterval(() => setNow(+new Date()), 1000);
    const timeSinceFromSeconds = Math.ceil((now - fromSeconds) / 1000);
    return fromSeconds > 0 && <p style={{color: 'black'}}>{timeSinceFromSeconds} seconds since last saved</p>
};