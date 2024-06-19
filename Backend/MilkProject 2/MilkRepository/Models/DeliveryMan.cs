﻿using System;
using System.Collections.Generic;

namespace MilkRepository.Models;

public partial class DeliveryMan
{
    public int DeliveryManId { get; set; }

    public string DeliveryName { get; set; } = null!;

    public string? DeliveryStatus { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public int? StorageId { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Storage? Storage { get; set; }
}
