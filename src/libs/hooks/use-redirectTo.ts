import { useEffect, useState } from 'react';


export default function useRedirectTo(
	destination: string,
): [string, string] {


	const modifiedDestination = (): string =>
		`${destination}`

	const [maskingDestination, setMaskingDestination] = useState(modifiedDestination());

	useEffect(() => {
		setMaskingDestination(modifiedDestination());
	}, [destination]);

	return [destination, maskingDestination];
}
