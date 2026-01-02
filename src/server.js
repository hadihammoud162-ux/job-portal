const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

