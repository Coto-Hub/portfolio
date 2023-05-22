/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,scss,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        dark: {
          100: "#C1C1C1",
          200: "#999999",
          300: "#767676",
          400: "#515151",
          500: "#222222",
        },
        table: {
          "big-border": "#451D13",
          border: "#663300",
          center: "#2B6D30",
        },
        hand: {
          bg: "#1C8823",
          token: "#AC1717",
        },
        card: {
          red: "#DC143C",
        },
        palette: {
          default: "",
          1: "#FF0000",
          2: "#003DC8",
          3: "#FFF500",
          4: "#00DD00",
          5: "#FF9200",
          6: "#FFFFFF",
        },
        bet: {
          green: '#0a8f0b',
          blue: '#019bfc',
          purple: '#b801bb',
          dark: '#000000',
          gold: '#ffd700',
        },
        screen: {
          light: '#333333',
          dark: '#222222',
        },
        result: {
          success: '#00FF00',
          error: '#AE1313'
        }
      },
      zIndex: {
        70: 70,
        100: 100,
      },
      aspectRatio: {
        "5/2": "5 / 2",
        "2/1": "2 / 1",
        "3/1": "3 / 1",
        "20/1": "20 / 1",
        "16/9": "16 / 9",
        "2/3": "2 / 3",
      },
      borderWidth: {
        6: "6px",
        12: '12px',
        16: '16px',
      },
      transitionProperty: {
        "w-h": "width, height",
        text: "font-size, line-height",
        opacity: "opacity",
      },
      transitionDuration: {
        2000: "1500ms",
      },
      rotate: {
        15: "15deg",
        67.5: "67.5deg",
        135: "135deg",
        360: "360deg",
      },
      spacing: {
        '0.8': '0.2rem',
        '4.25': '1.0625rem',
        19: "4.75rem",
        23: "5.75rem",
        30: "7.5rem",
        50: "12.5rem",
        62: "15.5rem",
        64: "16rem",
        120: "30rem",
        "3/200": "1.5%",
        "3/100": "3%",
        "1/20": "5%",
        "1/10": "10%",
        "3/25": "12%",
        "3/20": "15%",
        "1/5": "20%",
        "7/25": "28%",
        "3/10": "30%",
        "9/20": "45%",
        "11/20": "55%",
        "27/40": "67.5%",
        "3/4": "75%",
        "8/10": "80%",
        "9/10": "90%",
      },
      fontSize: {
        0: "0rem",
        xxs: '0.5rem',
      },
      keyframes: {
        wiggle: {
          "25%, 75%": { transform: "rotate(-20deg)" },
          "50%": { transform: "rotate(20deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s linear",
      },
      lineHeight: {
        0: "0rem",
      },
    },
  },
  plugins: [],
};
