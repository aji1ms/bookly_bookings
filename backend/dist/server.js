// src/server.ts
import express7 from "express";
import dotenv2 from "dotenv";
import cors from "cors";

// src/config/db.ts
import mongoose from "mongoose";
var connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("DB Connected");
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
};
var db_default = connectDB;

// src/server.ts
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// src/routes/serviceType.routes.ts
import express from "express";

// src/controllers/serviceType.controller.ts
import mongoose3 from "mongoose";

// src/models/ServiceType.model.ts
import mongoose2, { Schema } from "mongoose";
var serviceTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
var ServiceType_model_default = mongoose2.model("ServiceType", serviceTypeSchema);

// src/controllers/serviceType.controller.ts
var createServiceType = async (req, res) => {
  try {
    const { name, slug, isActive } = req.body;
    if (!name || !slug) {
      res.status(400).json({
        success: false,
        message: "Name and slug are required"
      });
      return;
    }
    const existing = await ServiceType_model_default.findOne({ slug });
    if (existing) {
      res.status(409).json({
        success: false,
        message: "Service type with this slug already exists"
      });
      return;
    }
    const serviceType = await ServiceType_model_default.create({
      name,
      slug,
      isActive
    });
    res.status(201).json({
      success: true,
      message: "Service type created successfully",
      data: serviceType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getAllServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceType_model_default.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Service types fetched successfully",
      data: serviceTypes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getServiceTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose3.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid service type ID"
      });
      return;
    }
    const serviceType = await ServiceType_model_default.findById(id);
    if (!serviceType) {
      res.status(404).json({
        success: false,
        message: "Service type not found"
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Service type fetched successfully",
      data: serviceType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var updateServiceType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, isActive } = req.body;
    if (!mongoose3.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid service type ID"
      });
      return;
    }
    const serviceType = await ServiceType_model_default.findById(id);
    if (!serviceType) {
      res.status(404).json({
        success: false,
        message: "Service type not found"
      });
      return;
    }
    if (slug && slug !== serviceType.slug) {
      const slugExists = await ServiceType_model_default.findOne({ slug });
      if (slugExists) {
        res.status(409).json({
          success: false,
          message: "Slug already in use"
        });
        return;
      }
    }
    serviceType.name = name ?? serviceType.name;
    serviceType.slug = slug ?? serviceType.slug;
    serviceType.isActive = isActive ?? serviceType.isActive;
    await serviceType.save();
    res.status(200).json({
      success: true,
      message: "Service type updated successfully",
      data: serviceType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var deleteServiceType = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose3.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid service type ID"
      });
      return;
    }
    const serviceType = await ServiceType_model_default.findById(id);
    if (!serviceType) {
      res.status(404).json({
        success: false,
        message: "Service type not found"
      });
      return;
    }
    await serviceType.deleteOne();
    res.status(200).json({
      success: true,
      message: "Service type deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// src/routes/serviceType.routes.ts
var router = express.Router();
router.post("/", createServiceType);
router.get("/", getAllServiceTypes);
router.get("/:id", getServiceTypeById);
router.put("/:id", updateServiceType);
router.delete("/:id", deleteServiceType);
var serviceType_routes_default = router;

// src/routes/business.routes.ts
import express2 from "express";

// src/controllers/business.controller.ts
import mongoose5 from "mongoose";

// src/models/Business.model.ts
import mongoose4, { Schema as Schema2 } from "mongoose";
var businessSchema = new Schema2(
  {
    serviceType: {
      type: mongoose4.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    location: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    startingPrice: {
      type: Number,
      required: true
    },
    serviceCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
var Business_model_default = mongoose4.model("Business", businessSchema);

// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var cloudinary_default = cloudinary;

// src/middleware/upload.ts
import multer from "multer";
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});
var upload_default = upload;

// src/controllers/business.controller.ts
var createBusiness = async (req, res) => {
  upload_default.single("image")(req, res, async (err) => {
    if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    try {
      const {
        serviceType,
        name,
        description,
        location,
        rating,
        startingPrice,
        serviceCount,
        isActive
      } = req.body;
      if (!serviceType || !name || !description || !location || !startingPrice) {
        return res.status(400).json({
          success: false,
          message: "Required fields are missing"
        });
      }
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image is required"
        });
      }
      if (!mongoose5.Types.ObjectId.isValid(serviceType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid service type ID"
        });
      }
      const serviceTypeExists = await ServiceType_model_default.findById(serviceType);
      if (!serviceTypeExists) {
        return res.status(404).json({
          success: false,
          message: "Service type not found"
        });
      }
      const uploadResult = await cloudinary_default.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "booking_business_images"
        }
      );
      const business = await Business_model_default.create({
        serviceType,
        name,
        description,
        location,
        rating,
        startingPrice,
        serviceCount,
        isActive,
        image: uploadResult.secure_url
      });
      return res.status(201).json({
        success: true,
        message: "Business created successfully",
        data: business
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });
};
var getAllBusinesses = async (req, res) => {
  try {
    const { slug, search } = req.query;
    const filter = {};
    if (slug) {
      const serviceType = await ServiceType_model_default.findOne({ slug });
      if (!serviceType) {
        return res.status(404).json({
          success: false,
          message: "Service type not found for the given slug"
        });
      }
      filter.serviceType = serviceType._id;
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    const businesses = await Business_model_default.find(filter).populate("serviceType", "name slug").sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Businesses fetched successfully",
      data: businesses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose5.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid business ID"
      });
    }
    const business = await Business_model_default.findById(id).populate(
      "serviceType",
      "name slug"
    );
    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Business fetched successfully",
      data: business
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var updateBusiness = async (req, res) => {
  upload_default.single("image")(req, res, async (err) => {
    if (err instanceof Error) {
      return res.status(400).json({ success: false, message: err.message });
    }
    try {
      const { id } = req.params;
      if (!mongoose5.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid business ID"
        });
      }
      const business = await Business_model_default.findById(id);
      if (!business) {
        return res.status(404).json({
          success: false,
          message: "Business not found"
        });
      }
      if (req.file) {
        const uploadResult = await cloudinary_default.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "booking_business_images"
          }
        );
        business.image = uploadResult.secure_url;
      }
      const body = req.body;
      business.name = body.name ?? business.name;
      business.description = body.description ?? business.description;
      business.location = body.location ?? business.location;
      business.rating = body.rating ?? business.rating;
      business.startingPrice = body.startingPrice ?? business.startingPrice;
      business.serviceCount = body.serviceCount ?? business.serviceCount;
      business.isActive = body.isActive ?? business.isActive;
      await business.save();
      return res.status(200).json({
        success: true,
        message: "Business updated successfully",
        data: business
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });
};
var deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose5.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid business ID"
      });
    }
    const business = await Business_model_default.findById(id);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found"
      });
    }
    await business.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Business deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// src/routes/business.routes.ts
var router2 = express2.Router();
router2.post("/", createBusiness);
router2.get("/", getAllBusinesses);
router2.get("/:id", getBusinessById);
router2.put("/:id", updateBusiness);
router2.delete("/:id", deleteBusiness);
var business_routes_default = router2;

// src/routes/service.routes.ts
import express3 from "express";

// src/controllers/service.controller.ts
import mongoose7 from "mongoose";

// src/models/Service.model.ts
import mongoose6, { Schema as Schema3 } from "mongoose";
var serviceSchema = new Schema3(
  {
    business: {
      type: mongoose6.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    duration: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
var Service_model_default = mongoose6.model("Service", serviceSchema);

// src/controllers/service.controller.ts
var createService = async (req, res) => {
  try {
    const { business, name, description, duration, price, isActive } = req.body;
    if (!business || !name || !description || !duration || !price) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
    }
    if (!mongoose7.Types.ObjectId.isValid(business)) {
      return res.status(400).json({
        success: false,
        message: "Invalid business ID"
      });
    }
    const businessExists = await Business_model_default.findById(business);
    if (!businessExists) {
      return res.status(404).json({
        success: false,
        message: "Business not found"
      });
    }
    const service = await Service_model_default.create({
      business,
      name,
      description,
      duration,
      price,
      isActive
    });
    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getAllServices = async (req, res) => {
  try {
    const { business } = req.query;
    const filter = {};
    if (business) {
      if (!mongoose7.Types.ObjectId.isValid(business)) {
        return res.status(400).json({
          success: false,
          message: "Invalid business ID"
        });
      }
      filter.business = business;
    }
    const services = await Service_model_default.find(filter).populate("business", "name location").sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: services
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose7.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }
    const service = await Service_model_default.findById(id).populate(
      "business",
      "name location"
    );
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      data: service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var updateService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose7.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }
    const service = await Service_model_default.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }
    service.name = req.body.name ?? service.name;
    service.description = req.body.description ?? service.description;
    service.duration = req.body.duration ?? service.duration;
    service.price = req.body.price ?? service.price;
    service.isActive = req.body.isActive ?? service.isActive;
    await service.save();
    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose7.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }
    const service = await Service_model_default.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }
    await service.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Service deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// src/routes/service.routes.ts
var router3 = express3.Router();
router3.post("/", createService);
router3.get("/", getAllServices);
router3.get("/:id", getServiceById);
router3.put("/:id", updateService);
router3.delete("/:id", deleteService);
var service_routes_default = router3;

// src/routes/staff.routes.ts
import express4 from "express";

// src/controllers/staff.controller.ts
import mongoose9 from "mongoose";

// src/models/Staff.model.ts
import mongoose8, { Schema as Schema4 } from "mongoose";
var staffSchema = new Schema4(
  {
    business: {
      type: mongoose8.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "Professional"
    },
    services: [
      {
        type: mongoose8.Schema.Types.ObjectId,
        ref: "Service"
      }
    ],
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
var Staff_model_default = mongoose8.model("Staff", staffSchema);

// src/controllers/staff.controller.ts
var createStaff = async (req, res) => {
  try {
    const { business, name, role, services, isAvailable } = req.body;
    if (!business || !name) {
      res.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
      return;
    }
    if (!mongoose9.Types.ObjectId.isValid(business)) {
      res.status(400).json({
        success: false,
        message: "Invalid business ID"
      });
      return;
    }
    const businessExists = await Business_model_default.findById(business);
    if (!businessExists) {
      res.status(404).json({
        success: false,
        message: "Business not found"
      });
      return;
    }
    if (services && services.length > 0) {
      for (const serviceId of services) {
        if (!mongoose9.Types.ObjectId.isValid(serviceId)) {
          res.status(400).json({
            success: false,
            message: "Invalid service ID in services list"
          });
          return;
        }
      }
      const validServices = await Service_model_default.find({
        _id: { $in: services },
        business
      });
      if (validServices.length !== services.length) {
        res.status(400).json({
          success: false,
          message: "One or more services do not belong to this business"
        });
        return;
      }
    }
    const staff = await Staff_model_default.create({
      business,
      name,
      role,
      services,
      isAvailable
    });
    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getAllStaff = async (req, res) => {
  try {
    const { business } = req.query;
    const filter = {};
    if (business) {
      if (!mongoose9.Types.ObjectId.isValid(business)) {
        res.status(400).json({
          success: false,
          message: "Invalid business ID"
        });
        return;
      }
      filter.business = business;
    }
    const staffList = await Staff_model_default.find(filter).populate("business", "name location").populate("services", "name duration price").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Staff fetched successfully",
      data: staffList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose9.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid staff ID"
      });
      return;
    }
    const staff = await Staff_model_default.findById(id).populate("business", "name location").populate("services", "name duration price");
    if (!staff) {
      res.status(404).json({
        success: false,
        message: "Staff not found"
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Staff fetched successfully",
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getStaffByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { business } = req.query;
    if (!mongoose9.Types.ObjectId.isValid(serviceId)) {
      res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
      return;
    }
    const filter = {
      services: serviceId,
      isAvailable: true
    };
    if (business) {
      if (!mongoose9.Types.ObjectId.isValid(business)) {
        res.status(400).json({
          success: false,
          message: "Invalid business ID"
        });
        return;
      }
      filter.business = business;
    }
    const staffList = await Staff_model_default.find(filter).populate("business", "name location").populate("services", "name duration price");
    res.status(200).json({
      success: true,
      message: "Staff fetched by service successfully",
      data: staffList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { services } = req.body;
    if (!mongoose9.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid staff ID"
      });
      return;
    }
    const staff = await Staff_model_default.findById(id);
    if (!staff) {
      res.status(404).json({
        success: false,
        message: "Staff not found"
      });
      return;
    }
    if (services && services.length > 0) {
      for (const serviceId of services) {
        if (!mongoose9.Types.ObjectId.isValid(serviceId)) {
          res.status(400).json({
            success: false,
            message: "Invalid service ID in services list"
          });
          return;
        }
        const serviceExists = await Service_model_default.findById(serviceId);
        if (!serviceExists) {
          res.status(404).json({
            success: false,
            message: "Service not found in services list"
          });
          return;
        }
      }
      staff.services = services.map(
        (id2) => new mongoose9.Types.ObjectId(id2)
      );
    }
    staff.name = req.body.name ?? staff.name;
    staff.role = req.body.role ?? staff.role;
    staff.isAvailable = req.body.isAvailable ?? staff.isAvailable;
    await staff.save();
    res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose9.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid staff ID"
      });
      return;
    }
    const staff = await Staff_model_default.findById(id);
    if (!staff) {
      res.status(404).json({
        success: false,
        message: "Staff not found"
      });
      return;
    }
    await staff.deleteOne();
    res.status(200).json({
      success: true,
      message: "Staff deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// src/routes/staff.routes.ts
var router4 = express4.Router();
router4.post("/", createStaff);
router4.get("/", getAllStaff);
router4.get("/:id", getStaffById);
router4.get("/by-service/:serviceId", getStaffByService);
router4.put("/:id", updateStaff);
router4.delete("/:id", deleteStaff);
var staff_routes_default = router4;

// src/routes/user.routes.ts
import express5 from "express";

// src/models/User.model.ts
import mongoose10, { Schema as Schema5 } from "mongoose";
var userSchema = new Schema5(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
var User_model_default = mongoose10.model("User", userSchema);

// src/controllers/user.controller.ts
var createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
      return;
    }
    const user = await User_model_default.create({
      name,
      email,
      phone
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// src/routes/user.routes.ts
var router5 = express5.Router();
router5.post("/", createUser);
var user_routes_default = router5;

// src/routes/booking.routes.ts
import express6 from "express";

// src/controllers/booking.controller.ts
import mongoose12 from "mongoose";

// src/models/Booking.model.ts
import mongoose11, { Schema as Schema6 } from "mongoose";
var bookingSchema = new Schema6(
  {
    bookingNumber: {
      type: String,
      unique: true,
      required: true
    },
    serviceType: {
      type: mongoose11.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true
    },
    business: {
      type: mongoose11.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },
    service: {
      type: mongoose11.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    staff: {
      type: mongoose11.Schema.Types.ObjectId,
      ref: "Staff",
      default: null
    },
    user: {
      type: mongoose11.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed"
    },
    notes: {
      type: String,
      maxlength: 500
    }
  },
  { timestamps: true }
);
bookingSchema.index(
  { business: 1, date: 1, time: 1, staff: 1 },
  { unique: true }
);
var Booking_model_default = mongoose11.model("Booking", bookingSchema);

// src/helper/generateSlotes.ts
var generateSlots = (startHour = 9, endHour = 21, interval = 45) => {
  const slots = [];
  let current = /* @__PURE__ */ new Date();
  current.setHours(startHour, 0, 0, 0);
  const end = /* @__PURE__ */ new Date();
  end.setHours(endHour, 0, 0, 0);
  while (current < end) {
    const hours = current.getHours().toString().padStart(2, "0");
    const minutes = current.getMinutes().toString().padStart(2, "0");
    slots.push(`${hours}:${minutes}`);
    current.setMinutes(current.getMinutes() + interval);
  }
  return slots;
};

// src/controllers/booking.controller.ts
var bookingNumberGenerator = () => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `#${year}-${random}`;
};
var createBooking = async (req, res) => {
  try {
    const {
      serviceType,
      business,
      service,
      staff,
      user,
      date,
      time,
      totalAmount,
      notes
    } = req.body;
    if (!serviceType || !business || !service || !user || !date || !time || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
    }
    const idsToValidate = [serviceType, business, service, user];
    if (staff) idsToValidate.push(staff);
    for (const id of idsToValidate) {
      if (!mongoose12.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID provided"
        });
      }
    }
    const bookingDate = new Date(date);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        message: "Cannot book past dates"
      });
    }
    const [serviceTypeExists, businessExists, serviceExists, userExists] = await Promise.all([
      ServiceType_model_default.findById(serviceType),
      Business_model_default.findById(business),
      Service_model_default.findById(service),
      User_model_default.findById(user)
    ]);
    if (!serviceTypeExists || !businessExists || !serviceExists || !userExists) {
      return res.status(404).json({
        success: false,
        message: "Referenced data not found"
      });
    }
    if (staff) {
      const staffExists = await Staff_model_default.findById(staff);
      if (!staffExists) {
        return res.status(404).json({
          success: false,
          message: "Staff not found"
        });
      }
    }
    const existingBooking = await Booking_model_default.findOne({
      business,
      date: bookingDate,
      time,
      staff: staff || null,
      status: "confirmed"
    });
    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked"
      });
    }
    const booking = await Booking_model_default.create({
      bookingNumber: bookingNumberGenerator(),
      serviceType,
      business,
      service,
      staff: staff || null,
      user,
      date: bookingDate,
      time,
      totalAmount,
      notes
    });
    const populatedBooking = await Booking_model_default.findById(booking._id).populate("serviceType", "name slug").populate("business", "name location image").populate("service", "name duration price").populate("staff", "name role").populate("user", "name email phone");
    return res.status(201).json({
      success: true,
      message: "Booking confirmed",
      data: populatedBooking
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11e3) {
      return res.status(409).json({
        success: false,
        message: "Time slot already booked"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
var getAvailableSlots = async (req, res) => {
  try {
    const { businessId, staffId, date } = req.query;
    if (!businessId || !date) {
      return res.status(400).json({
        success: false,
        message: "Business ID and date are required"
      });
    }
    if (!mongoose12.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid business ID"
      });
    }
    if (staffId && !mongoose12.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID"
      });
    }
    const startOfDay = /* @__PURE__ */ new Date(`${date}T00:00:00.000Z`);
    const endOfDay = /* @__PURE__ */ new Date(`${date}T23:59:59.999Z`);
    const todayUTC = /* @__PURE__ */ new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);
    if (startOfDay < todayUTC) {
      return res.status(400).json({
        success: false,
        message: "Cannot select past dates"
      });
    }
    const allSlots = generateSlots(9, 21, 45);
    if (staffId) {
      const staff = await Staff_model_default.findById(staffId);
      if (!staff) {
        return res.status(404).json({
          success: false,
          message: "Staff not found"
        });
      }
      if (!staff.isAvailable) {
        return res.status(400).json({
          success: false,
          message: "Staff is currently unavailable"
        });
      }
      const bookings2 = await Booking_model_default.find({
        staff: staffId,
        date: { $gte: startOfDay, $lte: endOfDay },
        status: "confirmed"
      }).select("time");
      const bookedTimes = bookings2.map((b) => b.time);
      let availableSlots2 = allSlots.filter(
        (slot) => !bookedTimes.includes(slot)
      );
      if (startOfDay.getTime() === todayUTC.getTime()) {
        const now = /* @__PURE__ */ new Date();
        const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        availableSlots2 = availableSlots2.filter(
          (slot) => slot > currentTime
        );
      }
      return res.status(200).json({
        success: true,
        message: "Available slots fetched successfully",
        data: {
          date,
          mode: "specific-staff",
          staff: staff.name,
          bookedSlots: bookedTimes,
          availableSlots: availableSlots2
        }
      });
    }
    const staffList = await Staff_model_default.find({
      business: businessId,
      isAvailable: true
    }).select("_id");
    if (!staffList.length) {
      return res.status(200).json({
        success: true,
        message: "No staff available for this business",
        data: {
          date,
          mode: "any-staff",
          availableSlots: []
        }
      });
    }
    const staffIds = staffList.map((s) => s._id);
    const bookings = await Booking_model_default.find({
      staff: { $in: staffIds },
      date: { $gte: startOfDay, $lte: endOfDay },
      status: "confirmed"
    }).select("time staff");
    const bookingCountMap = {};
    bookings.forEach((booking) => {
      bookingCountMap[booking.time] = (bookingCountMap[booking.time] || 0) + 1;
    });
    const totalStaff = staffIds.length;
    let availableSlots = allSlots.filter((slot) => {
      const bookedCount = bookingCountMap[slot] || 0;
      return bookedCount < totalStaff;
    });
    if (startOfDay.getTime() === todayUTC.getTime()) {
      const now = /* @__PURE__ */ new Date();
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      availableSlots = availableSlots.filter(
        (slot) => slot > currentTime
      );
    }
    return res.status(200).json({
      success: true,
      message: "Available slots fetched successfully",
      data: {
        date,
        mode: "any-staff",
        totalStaff,
        availableSlots
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// src/routes/booking.routes.ts
var router6 = express6.Router();
router6.post("/", createBooking);
router6.get("/available-slots", getAvailableSlots);
var booking_routes_default = router6;

// src/server.ts
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename2);
dotenv2.config({ path: path2.resolve(__dirname2, "../.env") });
var server = express7();
var corsOptions = {
  origin: [
    "https://bookly-at4d7f4lh-ajims-ismails-projects.vercel.app",
    "https://bookly-henna.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
server.use(cors(corsOptions));
server.use(express7.json());
db_default();
var PORT = process.env.PORT || 3e3;
server.use("/api/service-types", serviceType_routes_default);
server.use("/api/businesses", business_routes_default);
server.use("/api/services", service_routes_default);
server.use("/api/staffs", staff_routes_default);
server.use("/api/users", user_routes_default);
server.use("/api/bookings", booking_routes_default);
server.listen(PORT, () => {
  console.log(`Server is running on port`);
});
