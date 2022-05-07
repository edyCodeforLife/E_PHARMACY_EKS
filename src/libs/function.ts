
export const qsToObj = (str: any) =>
	JSON.parse(
		'{"' + str.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
		function (key, value) {
			return key === '' ? value : decodeURIComponent(value);
		}
	);

export const clamp = (val: number, min: number, max: number) =>
	Math.min(Math.max(min, val), max);

export const serialize = (obj: any) => {
	let str = [];
	for (let p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
	return str.join('&');
};

export const isMobile = (ua: any) => {
	return /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(
		ua
	);
}

export const currencyFormat = (num: number) => {
	return 'Rp ' + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}


export const scrollTo = (element: any, to: any, duration: any) => {
	try {
		let start = element.scrollTop,
			change = to - start,
			currentTime = 0,
			increment = 25;

		let easeInOutQuad = (t: any, b: any, c: any, d: any) => {
			t /= d / 2;
			if (t < 1) return (c / 2) * t * t + b;
			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		};

		let animateScroll = () => {
			currentTime += increment;
			var val = easeInOutQuad(currentTime, start, change, duration);
			element.scrollTop = val;
			if (currentTime < duration) {
				setTimeout(animateScroll, increment);
			}
		};

		animateScroll();
	} catch (err) {
		console.log(err);
	}
};

export const formatDate = (date: any) => {
	const monthName = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    var d = new Date(date),
      month = '' + (monthName[d.getMonth()]),
      day = '' + d.getDate(),
      year = d.getFullYear(),
	  hour = '' + (d.getHours()),
	  minute = '' + (d.getMinutes())

    if (day.length < 2) 
    	day = '0' + day;
	if (hour.length < 2)
		hour = '0' + hour;
	if (minute.length < 2)
		minute = '0' + minute;

    return `${day} ${month} ${year}, ${hour}:${minute} WIB`
}

export const isInMobileBrowser = (ua: any): boolean => {
	return /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(
		ua
	);
};