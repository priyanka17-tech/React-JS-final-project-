export const TOTAL_SLOTS = 100;

export const INITIAL_SLOTS = Array.from({ length: 30 }, (_, i) => {
  const index = i + 1;
  const zone = index <= 20 ? "Zone A" : "Zone B";
  const slotId = `${zone === "Zone A" ? "A" : "B"}-${String(index <= 20 ? index : index - 20).padStart(2, "0")}`;
  const isEV = index === 5 || index === 15 || index === 25;
  const isPremium = zone === "Zone B";
  return {
    id: slotId,
    zone,
    isEV,
    isPremium,
    ratePerHour: isEV ? 80 : isPremium ? 70 : 50
  };
});

export const INITIAL_VEHICLES = [
  { id: 1, number: "MH12AB1234", type: "Car", slot: "A-01", time: "09:12 AM", duration: "2h 45m", owner: "Rohit Sharma", phone: "+91 98230 11223" },
  { id: 2, number: "MH14CD5678", type: "Bike", slot: "A-03", time: "09:28 AM", duration: "2h 29m", owner: "Ananya Iyer", phone: "+91 98450 33445" },
  { id: 3, number: "MH02EF9012", type: "SUV", slot: "A-05", time: "10:04 AM", duration: "1h 53m", owner: "Vikram Malhotra", phone: "+91 97110 55667" },
  { id: 4, number: "MH01GH3456", type: "Car", slot: "A-07", time: "10:19 AM", duration: "1h 38m", owner: "Pooja Verma", phone: "+91 99880 77889" },
  { id: 5, number: "MH04JK7890", type: "Bike", slot: "A-09", time: "10:42 AM", duration: "1h 15m", owner: "Karan Johar", phone: "+91 96540 99001" },
  { id: 6, number: "MH03LM1122", type: "Car", slot: "A-11", time: "11:03 AM", duration: "0h 54m", owner: "Sneha Reddy", phone: "+91 91234 56780" },
  { id: 7, number: "DL08PQ4455", type: "EV", slot: "A-15", time: "11:20 AM", duration: "0h 37m", owner: "Aditya Roy", phone: "+91 98765 43210" },
  { id: 8, number: "KA05RS7788", type: "SUV", slot: "B-02", time: "11:35 AM", duration: "0h 22m", owner: "Neha Kapoor", phone: "+91 94567 12345" }
];

export const INITIAL_PAYMENTS = [
  {
    id: "PAY-10821",
    invoiceNo: "INV-2026-0821",
    vehicleNumber: "MH12AB1234",
    vehicleType: "Car",
    customerName: "Rohit Sharma",
    phone: "+91 98230 11223",
    slot: "A-01",
    entryTime: "09:12 AM",
    exitTime: "11:57 AM",
    duration: "2h 45m",
    ratePerHour: 50,
    subtotal: 137.5,
    tax: 24.75,
    total: 162.25,
    status: "Paid",
    method: "UPI",
    transactionId: "UPI/394018274/ICICI",
    date: "24 Nov 2026",
    time: "11:58 AM"
  },
  {
    id: "PAY-10820",
    invoiceNo: "INV-2026-0820",
    vehicleNumber: "MH14CD5678",
    vehicleType: "Bike",
    customerName: "Ananya Iyer",
    phone: "+91 98450 33445",
    slot: "A-03",
    entryTime: "09:28 AM",
    exitTime: "11:57 AM",
    duration: "2h 29m",
    ratePerHour: 30,
    subtotal: 74.5,
    tax: 13.41,
    total: 87.91,
    status: "Pending",
    method: "Cash",
    transactionId: "CSH-PEND-092",
    date: "24 Nov 2026",
    time: "11:57 AM"
  },
  {
    id: "PAY-10819",
    invoiceNo: "INV-2026-0819",
    vehicleNumber: "MH02EF9012",
    vehicleType: "SUV",
    customerName: "Vikram Malhotra",
    phone: "+91 97110 55667",
    slot: "A-05",
    entryTime: "08:15 AM",
    exitTime: "10:45 AM",
    duration: "2h 30m",
    ratePerHour: 70,
    subtotal: 175.0,
    tax: 31.5,
    total: 206.5,
    status: "Paid",
    method: "Credit Card",
    transactionId: "TXN-CC-8839210-HDFC",
    date: "24 Nov 2026",
    time: "10:46 AM"
  },
  {
    id: "PAY-10818",
    invoiceNo: "INV-2026-0818",
    vehicleNumber: "KA03MN4321",
    vehicleType: "Car",
    customerName: "Gaurav Joshi",
    phone: "+91 93456 78123",
    slot: "A-02",
    entryTime: "07:30 AM",
    exitTime: "10:15 AM",
    duration: "2h 45m",
    ratePerHour: 50,
    subtotal: 137.5,
    tax: 24.75,
    total: 162.25,
    status: "Paid",
    method: "UPI",
    transactionId: "UPI/992104821/GPAY",
    date: "24 Nov 2026",
    time: "10:16 AM"
  },
  {
    id: "PAY-10817",
    invoiceNo: "INV-2026-0817",
    vehicleNumber: "TS09XY9988",
    vehicleType: "SUV",
    customerName: "Sunil Narang",
    phone: "+91 98111 22334",
    slot: "B-01",
    entryTime: "08:00 AM",
    exitTime: "09:45 AM",
    duration: "1h 45m",
    ratePerHour: 70,
    subtotal: 122.5,
    tax: 22.05,
    total: 144.55,
    status: "Paid",
    method: "Credit Card",
    transactionId: "TXN-CC-4991201-AXIS",
    date: "24 Nov 2026",
    time: "09:47 AM"
  },
  {
    id: "PAY-10816",
    invoiceNo: "INV-2026-0816",
    vehicleNumber: "MH01GH3456",
    vehicleType: "Car",
    customerName: "Pooja Verma",
    phone: "+91 99880 77889",
    slot: "A-07",
    entryTime: "10:19 AM",
    exitTime: "—",
    duration: "1h 38m (Active)",
    ratePerHour: 50,
    subtotal: 81.67,
    tax: 14.7,
    total: 96.37,
    status: "Pending",
    method: "UPI",
    transactionId: "PRE-AUTH-UPI-412",
    date: "24 Nov 2026",
    time: "10:19 AM"
  },
  {
    id: "PAY-10815",
    invoiceNo: "INV-2026-0815",
    vehicleNumber: "HR26AB8811",
    vehicleType: "EV",
    customerName: "Devansh Mehta",
    phone: "+91 91029 38475",
    slot: "A-15",
    entryTime: "06:45 AM",
    exitTime: "09:15 AM",
    duration: "2h 30m",
    ratePerHour: 80,
    subtotal: 200.0,
    tax: 36.0,
    total: 236.0,
    status: "Paid",
    method: "UPI",
    transactionId: "UPI/771920384/PHONEPE",
    date: "24 Nov 2026",
    time: "09:17 AM"
  },
  {
    id: "PAY-10814",
    invoiceNo: "INV-2026-0814",
    vehicleNumber: "GJ01ZZ5566",
    vehicleType: "Bike",
    customerName: "Rakesh Patel",
    phone: "+91 98989 89898",
    slot: "A-04",
    entryTime: "07:10 AM",
    exitTime: "08:50 AM",
    duration: "1h 40m",
    ratePerHour: 30,
    subtotal: 50.0,
    tax: 9.0,
    total: 59.0,
    status: "Paid",
    method: "Cash",
    transactionId: "CSH-RCP-0814",
    date: "24 Nov 2026",
    time: "08:51 AM"
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: "RES-9041",
    vehicleNumber: "MH04EF7711",
    vehicleType: "Car",
    customerName: "Arjun Rampal",
    phone: "+91 98200 44556",
    slot: "A-04",
    date: "2026-11-24",
    displayDate: "Today, 24 Nov",
    startTime: "02:00 PM",
    endTime: "05:00 PM",
    durationHours: 3,
    estimatedAmount: 177,
    status: "Confirmed",
    notes: "Executive parking requested"
  },
  {
    id: "RES-9042",
    vehicleNumber: "DL03CC8899",
    vehicleType: "SUV",
    customerName: "Simran Kaur",
    phone: "+91 97112 33445",
    slot: "B-04",
    date: "2026-11-24",
    displayDate: "Today, 24 Nov",
    startTime: "03:30 PM",
    endTime: "07:30 PM",
    durationHours: 4,
    estimatedAmount: 330,
    status: "Arriving Soon",
    notes: "VIP guest from Delhi"
  },
  {
    id: "RES-9043",
    vehicleNumber: "MH12ZX9900",
    vehicleType: "EV",
    customerName: "Kabir Sengupta",
    phone: "+91 99223 88123",
    slot: "A-25",
    date: "2026-11-25",
    displayDate: "Tomorrow, 25 Nov",
    startTime: "10:00 AM",
    endTime: "02:00 PM",
    durationHours: 4,
    estimatedAmount: 377,
    status: "Confirmed",
    notes: "Requires Level 2 EV charging"
  },
  {
    id: "RES-9044",
    vehicleNumber: "KA01AB4432",
    vehicleType: "Bike",
    customerName: "Tanvi Deshmukh",
    phone: "+91 94481 00293",
    slot: "A-06",
    date: "2026-11-25",
    displayDate: "Tomorrow, 25 Nov",
    startTime: "09:00 AM",
    endTime: "01:00 PM",
    durationHours: 4,
    estimatedAmount: 141,
    status: "Confirmed",
    notes: "Standard two-wheeler slot"
  }
];

export const INITIAL_ACTIVITIES = [
  { id: 1, text: "MH03LM1122 parked in Slot A-11", type: "entry", time: "11:03 AM", actor: "Valet Gate 1" },
  { id: 2, text: "Payment of ₹206.50 received for MH02EF9012 via Credit Card", type: "payment", time: "10:46 AM", actor: "POS Terminal 3" },
  { id: 3, text: "MH04JK7890 parked in Slot A-09", type: "entry", time: "10:42 AM", actor: "ANPR Cam North" },
  { id: 4, text: "KA03MN4321 exited from Slot A-02. Cleared for new parking.", type: "exit", time: "10:15 AM", actor: "Boom Barrier Exit" },
  { id: 5, text: "New reservation #RES-9042 created for DL03CC8899 in Slot B-04", type: "reservation", time: "10:12 AM", actor: "Online Portal" },
  { id: 6, text: "MH01GH3456 parked in Slot A-07", type: "entry", time: "10:19 AM", actor: "ANPR Cam South" },
  { id: 7, text: "Payment of ₹236.00 received for HR26AB8811 via UPI", type: "payment", time: "09:17 AM", actor: "QR Scan & Pay" },
  { id: 8, text: "GJ01ZZ5566 exited from Slot A-04", type: "exit", time: "08:50 AM", actor: "Boom Barrier Exit" }
];

export const ANALYTICS_DATA = {
  dailyRevenue: [
    { day: "Mon", revenue: 8450, vehicles: 64, occupancyPct: 64 },
    { day: "Tue", revenue: 9820, vehicles: 78, occupancyPct: 78 },
    { day: "Wed", revenue: 11400, vehicles: 89, occupancyPct: 89 },
    { day: "Thu", revenue: 10650, vehicles: 82, occupancyPct: 82 },
    { day: "Fri", revenue: 14200, vehicles: 105, occupancyPct: 95 },
    { day: "Sat", revenue: 18900, vehicles: 136, occupancyPct: 98 },
    { day: "Sun (Today)", revenue: 16450, vehicles: 118, occupancyPct: 88 }
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 284000 },
    { month: "Feb", revenue: 298000 },
    { month: "Mar", revenue: 345000 },
    { month: "Apr", revenue: 360000 },
    { month: "May", revenue: 395000 },
    { month: "Jun", revenue: 420000 },
    { month: "Jul", revenue: 410000 },
    { month: "Aug", revenue: 435000 },
    { month: "Sep", revenue: 452000 },
    { month: "Oct", revenue: 490000 },
    { month: "Nov (Est)", revenue: 512000 },
    { month: "Dec (Proj)", revenue: 560000 }
  ],
  hourlyOccupancy: [
    { time: "06:00", occupancy: 12 },
    { time: "08:00", occupancy: 38 },
    { time: "10:00", occupancy: 74 },
    { time: "12:00", occupancy: 92 },
    { time: "14:00", occupancy: 85 },
    { time: "16:00", occupancy: 79 },
    { time: "18:00", occupancy: 96 },
    { time: "20:00", occupancy: 84 },
    { time: "22:00", occupancy: 42 },
    { time: "00:00", occupancy: 18 }
  ],
  vehicleDistribution: [
    { type: "Car", count: 48, percentage: 56, color: "#3b82f6", revenueShare: 54 },
    { type: "SUV", count: 20, percentage: 23, color: "#8b5cf6", revenueShare: 29 },
    { type: "Bike", count: 12, percentage: 14, color: "#10b981", revenueShare: 8 },
    { type: "EV", count: 6, percentage: 7, color: "#06b6d4", revenueShare: 9 }
  ],
  topSlots: [
    { slot: "A-03", count: 142, revenue: 21300, avgDuration: "2h 15m", zone: "Zone A" },
    { slot: "A-07", count: 138, revenue: 19850, avgDuration: "2h 40m", zone: "Zone A" },
    { slot: "A-15 (EV)", count: 129, revenue: 27400, avgDuration: "3h 10m", zone: "Zone A (EV)" },
    { slot: "B-02", count: 119, revenue: 23800, avgDuration: "2h 50m", zone: "Zone B (Premium)" },
    { slot: "A-01", count: 114, revenue: 18200, avgDuration: "1h 45m", zone: "Zone A" }
  ]
};
