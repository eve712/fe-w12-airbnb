export default class CalendarMaker {
    constructor() {
        this.year;
        this.month;
        this.today;
        this.lastDayOfWeek;// 주의 마지막 일
    }
    getCalendar(year, month) {
        const isPrev = this.isPrevMonth(year, month);
        const html = this.getCalendarHtml(year, month, isPrev);
        return html;
    }
    isPrevMonth(year, month) {
        const isPrev = (year < this.year || year === this.year && month < this.month) ?  'isPrev'
        : (year == this.year && month == this.month) ? 'needCheck' : 'isNotPrev';
        return isPrev;
    }
    getCalendarHtml(year, month, isPrev) {
        const [firstDayName, lastDayName] = this.getMonthInfo(year, month);
        const html = this.getFirstWeek(isPrev, firstDayName) + this.getMiddleWeek(isPrev) + this.getLastWeek(isPrev, lastDayName);
        return html; 
    }
    getMonthInfo(year, month) {
        const firstDayName = new Date(year, month, 1).getDay(); // getFirstWeek 함수에서 사용 
        const lastDayName = new Date(year, month + 1, 0).getDay() + 1; // getLastWeek 함수에서 사용
        return [firstDayName, lastDayName];
    }
    
    getFirstWeek(isPrev, firstDayName) {
        this.lastDayOfWeek = 7 - firstDayName;
        let week = `<tr>`;
        for(let i = 0; i < firstDayName; i++) {
            week += `<td></td>`
        }
        for(let j = 0; j < this.lastDayOfWeek; j++) {
            const date = j + 1;
            week = this.getWeekTemp(week, isPrev, date);
        }
        return week + `</tr>`;
    }

    getMiddleWeek(isPrev, week = `<tr>`) {
        for(let i = 0; i < 7; i++) {
            const date = this.lastDayOfWeek + i + 1;
            week = this.getWeekTemp(week, isPrev, date);
        }
        this.lastDayOfWeek += 7;
        if(this.lastDayOfWeek + 7 >= this.lastDay) return week +`</tr>`;
        else return this.getMiddleWeek(isPrev, week + `</tr>`);
    }

    getLastWeek(isPrev, lastDayName) {
        let week = `<tr>`;
        for(let i = 0; i < lastDayName; i++) {
            const date = this.lastDayOfWeek + i + 1;
            week = this.getWeekTemp(week, isPrev, date);
        }
        return week + `</tr>`;
    }

    getWeekTemp(week, isPrev, date) {
        const isPrevDate = isPrev === 'isPrev' || (isPrev === 'needCheck' && date < this.today);
        if(isPrevDate) week += `<td><span class="prevDate">${date}</span></td>`
        else { week += `<td><span>${date}</span></td>` }
        return week;
    }
}